const User = require('../2.1-models/userModel');

exports.signup = (req, res) => {
    const fullName = req.body.fullName;
    const username = req.body.username;
    const zip = req.body.zip;
    const phone = req.body.phone;
    const email = req.body.email;
    const pass = req.body.pass;

    const authorizationLevel = 1;

    const user = new User({
        fullName: fullName,
        username: username,
        zip: zip,
        email: email,
        phone: phone,
        pass: pass,
        authorizationLevel: authorizationLevel
    });
    return user.save().then(result => {
        req.session.fullName = fullName;
        req.session.username = username;
        req.session.zip = zip;
        req.session.phone = phone;
        req.session.email = email;
        req.session.isAuthorized = true;
        req.session.profileImgUrl = "avatar";

        res.redirect('/');
    });
};

exports.signin = (req, res) => {
    const usernameOrEmail = req.body.usernameOrEmail;
    const pass = req.body.pass;
    User.findOne({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail}], pass: pass })
        .then((user, err) => {
            if (!user) {
                res.redirect('/');
            }
            req.session._id = user._id;
            req.session.fullName = user.fullName;
            req.session.username = user.username;
            req.session.zip = user.zip;
            req.session.phone = user.phone;
            req.session.email = user.email;
            req.session.isAuthorized = true;
            req.session.profileImgUrl = user.profileImgUrl;
            
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
            res.statusCode = 400;
            res.json({ err: err }).end();
        });
};

exports.signout = (req, res, next) => {
    req.session.destroy(err => { });
    res.redirect('/');
};

exports.postSettings = (req, res, next) => {
    const fullName = req.body.fullName;
    const username = req.body.username;
    const zip = req.body.zip;
    const phone = req.body.phone;
    const email = req.body.email;
    const pass = req.body.pass;

    var user = {};
    user.fullName = fullName;
    user.username = username;
    user.zip = zip;
    user.email = email;
    user.phone = phone;
    if (pass != "") user.pass = pass;

    User.findOneAndUpdate({ email: req.session.email }, user).then(result=>{
        req.session.fullName = fullName;
        req.session.username = username;
        req.session.zip = zip;
        req.session.phone = phone;
        req.session.email = email;
        res.redirect("/");
    }).catch((err) => {
        res.statusCode = 400;
        res.redirect("/settings");
    }); 
}




exports.postImage = (req, res, next) => {
    let fileName = "avatar";
    if (req.file && req.file.filename != "")
        fileName = req.file.filename;

    console.log(fileName)
    User.findOneAndUpdate({ email: req.session.email }, { profileImgUrl: fileName}).then(result => {
        req.session.profileImgUrl = fileName;
        res.redirect("/");
    }).catch((err) => {
        console.log(err);
        res.statusCode = 400;
        res.redirect("/settings");
    });
}