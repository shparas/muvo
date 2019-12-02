const Task = require('../2.1-models/taskModel');
const User = require('../2.1-models/userModel');


// POST /tasks with JSON body
exports.addTask = (req, res) => {
    const task = new Task({
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        fromStreet: req.body.fromStreet,
        fromCity: req.body.fromCity,
        fromState: req.body.fromState,
        fromZip: req.body.fromZip,
        toStreet: req.body.toStreet,
        toCity: req.body.toCity,
        toState: req.body.toState,
        toZip: req.body.toZip,
        difficulty: req.body.difficulty,
        skillsRequired: req.body.skillsRequired,
        estimatedTime: req.body.estimatedTime,
        pay: req.body.pay,
        timeStamp: Date.now(),
        user: req.session._id,
        locked: false
    });

    return task.save().then(result => {
        res.redirect('/dash');
        // res.json({ "status": 200, "error": "", "response": null });
        // res.end();
    });
}

// PUT /tasks?id=_id => _id of current logged in user modified
exports.updateTask = (req, res) => {
    var id = req.query.id;
    const task = {
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        fromStreet: req.body.fromStreet,
        fromCity: req.body.fromCity,
        fromState: req.body.fromState,
        fromZip: req.body.fromZip,
        toStreet: req.body.toStreet,
        toCity: req.body.toCity,
        toState: req.body.toState,
        toZip: req.body.toZip,
        difficulty: req.body.difficulty,
        skillsRequired: req.body.skillsRequired,
        estimatedTime: req.body.estimatedTime,
        pay: req.body.pay,
        timeStamp: Date.now()
    };
    console.log(id, task);
    if (id) {
        Task.updateOne({ user: req.session._id, _id: id },
            task,
            (error, data) => {
                console.log(data);
                if (data && data.nModified > 0) {
                    res.json({ "status": 200, "error": "", "response": null });
                } else {
                    res.json({ "status": 404, "error": "Resource not found", "response": null });
                }
                res.end();
            });
    } else {
        res.json({ "status": 404, "error": "Resource not found", "response": null });
        res.end();
    }
}

exports.favorite = (req, res) => {
    var id = req.query.id;
    var stat = parseInt(req.query.stat);

    if (id && req.session && req.session.email) {
        var query = { $addToSet: { favorites: req.session._id } };
        if (stat == 0) {
            query = { $pull: { favorites: req.session._id } };
        }
        Task.updateOne({ _id: id }, query, (error, data) => {
            console.log(data);
            if (data && data.nModified > 0) {
                res.json({ "status": 200, "error": "", "response": null });
            } else {
                res.json({ "status": 404, "error": "Resource not found", "response": null });
            }
            res.end();
        });
    };
}


exports.requestHelp = (req, res) => {
    var id = req.query.id;
    var stat = parseInt(req.query.stat);

    if (id && req.session && req.session.email) {
        var query = { $addToSet: { requests: req.session._id, favorites: req.session._id } };
        if (stat == 0) {
            query = { $pull: { requests: req.session._id } };
        }
        Task.updateOne({ _id: id }, query, (error, data) => {
            console.log(data);
            if (data && data.nModified > 0) {
                res.json({ "status": 200, "error": "", "response": null });
            } else {
                res.json({ "status": 404, "error": "Resource not found", "response": null });
            }
            res.end();
        });
    };

}


// DELETE /tasks?id=_id => _id is task id of logged in user
exports.removeTask = (req, res) => {
    var id = req.query.id;
    if (id) {
        Task.deleteOne({ user: req.session._id, _id: id },
            (error, data) => {
                console.log(data);
                if (data && data.deletedCount > 0) {
                    res.json({ "status": 200, "error": "", "response": null });
                } else {
                    res.json({ "status": 404, "error": "Resource not found", "response": null });
                }
                res.end();
            });
    }
}


// PUT /tasks?id=_id&stat=true => _id is task id of logged in user
exports.lockTask = (req, res) => {
    var id = req.query.id;
    var stat = (req.query.stat == "true");

    if (id) {
        Task.updateOne({ user: req.session._id, _id: id }, { locked: stat }).then(data => {
            if (data && data.nModified > 0) {
                res.json({ "status": 200, "error": "", "response": null });
            } else {
                res.json({ "status": 404, "error": "Resource not found", "response": null });
            }
            res.end();
        }).catch((err) => {
            res.json({ "status": 404, "error": "Resource not found", "response": null });
            res.end();
        });
    }
}


// GET /tasks => all tasks except for current logged in users
// GET /tasks?user=username or loggedIn => all tasks of the user with that email address
exports.getTasks = (req, res) => {
    var getQuery = async function (username) {
        return new Promise((resolve, reject) => {
            if (username) {
                if (username == "loggedIn") {
                    resolve({ user: req.session._id });
                } else {
                    const id = User.find({ username: username }).exec((err, data) => {
                        resolve({ user: data._id });
                    });
                }
            } else {
                resolve({ user: { $ne: req.session._id }, locked: { $ne: true } });
            }
        });
    }

    getQuery(req.query.user).then(query => {
        Task.find(query).populate('user').populate('favorites').populate('requests').lean().exec(
            function (err, data) {
                data.map(item => {
                    if (req.query.user != req.session.username && req.query.user != "loggedIn") {
                        item.isFavorite = false;
                        item.hasRequested = false;

                        for (var i = 0; i < item.favorites.length; i++) {
                            if (item.favorites[i].email == req.session.email) {
                                item.isFavorite = true;
                                break;
                            }
                        }
                        for (var i = 0; i < item.requests.length; i++) {
                            if (item.requests[i].email == req.session.email) {
                                item.hasRequested = true;
                                break;
                            }
                        }
                        delete item.favorites;
                        delete item.requests;
                    } else {
                        item.favorites = item.favorites.map(fav => {
                            return {
                                username: fav.username,
                                email: fav.email,
                                phone: fav.phone,
                                profileImgUrl: fav.profileImgUrl
                            };
                        });
                        item.requests = item.requests.map(fav => {
                            return {
                                username: fav.username,
                                email: fav.email,
                                phone: fav.phone,
                                profileImgUrl: fav.profileImgUrl
                            };
                        });
                    }
                    let temp = item.user;
                    item.user = temp.username;
                    item.userImg = temp.profileImgUrl;
                });
                console.log(data);
                res.setHeader('Content-Type', 'application/json');
                data.reverse();
                return res.send(JSON.stringify(data));
            }
        );
    });
}
