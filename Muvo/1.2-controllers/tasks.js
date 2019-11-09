const Task = require('../2.1-models/task');


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
        user: req.session.email
    });

    return task.save().then(result => {
        res.json({ "status": 200, "error": "", "response": null });
        res.end();
    });
    console.log("hello");
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
        timeStamp: Date.now(),
        user: req.session.email
    };

    if (id) {
        Task.updateOne({ user: req.session.email, _id: id }, task, 
            (error, data) => {
                console.log(data);
                if (data && data.nModified > 0) {
                    res.json({ "status": 200, "error": "", "response": null });
                } else {
                    res.json({ "status": 404, "error": "Resource not found", "response": null });
                }
                res.end();
            });
    }
}

// DELETE /tasks?id=_id => _id is task id of logged in user
exports.removeTask = (req, res) => {
    var id = req.query.id;
    if (id) {
        Task.deleteOne({ user: req.session.email, _id: id },
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

// GET /tasks => all tasks except for current logged in users
// GET /tasks?user=email => all tasks of the user with that email address
exports.getTasks = (req, res) => {
    query = {};
    if (req.query.user) {
        query = { user: req.query.user };
    } else {
        query = {
            user: { $ne: req.session.email }
        };
    }
    Task.find(query,
        function (err, data) {
            console.log("Sending Data: ", data);
            res.setHeader('Content-Type', 'application/json');
            return res.send(data);
        });
}
