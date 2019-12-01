const fs = require('fs');
const jwt = require('jsonwebtoken');

const User = require('../2.1-models/userModel');

const jwtKey = fs.readFileSync('./2.2-data/jwt.key');

exports.signup = (req, res) => {
    const fullName = req.body.fullName;
    const zip = req.body.zip;
    const phone = req.body.phone;
    const email = req.body.email;
    const username = req.body.username;
    const pass = req.body.pass;

    const authorizationLevel = 1;

    const user = new User({
        fullName: fullName,
        zip: zip,
        phone: phone,
        email: email,
        username: username,
        pass: pass,
        authorizationLevel: authorizationLevel
    });
    return user.save().then(result => {
        var token = jwt.sign({
            fullName: fullName,
            username: username,
            zip: zip,
            phone: phone,
            email: email,
            isAuthorized: true,
            profileImgUrl: "",
            time: Date.now() / 1000
        }, jwtKey);
        res.json({ token: token, err: "" }).end();
    }).catch(err => {
        res.statusCode = 400;
        console.log(err);
        res.json({err: err.message}).end();
    });
};

exports.signin = (req, res) => {
    const usernameOrEmail = req.body.usernameOrEmail;
    const pass = req.body.pass;
    User.findOne({ $or: [{ email: usernameOrEmail }, { username: usernameOrEmail}], pass: pass })
        .then(user => {
            console.log(usernameOrEmail);
            if (!user) {
                res.statusCode = 401;
                res.json({ err: err }).end();
            } else {
                var token = jwt.sign({
                    fullName: user.fullName,
                    username: user.username,
                    zip: user.zip,
                    phone: user.phone,
                    email: user.email,
                    isAuthorized: true,
                    profileImgUrl: user.profileImgUrl,
                    time: Date.now() / 1000
                }, jwtKey);
                res.json({ token: token, err: "" }).end();
            }
        })
        .catch(err => {
            res.statusCode = 400;
            res.json({ err: err }).end();
        });
};

exports.signout = (req, res, next) => {
    req.session.destroy(err => { });
    res.redirect('/');
};
exports.getSettings = (req, res, next) => {
}
exports.postSettings = (req, res, next) => {
    //var user = await User.findOne({ email: req.session.email });
    var user = {};
    const fullName = req.body.fullName;
    const username = req.body.username;
    const zip = req.body.zip;
    const phone = req.body.phone;
    const email = req.body.email;
    const pass = req.body.pass == "" ? user.pass : req.body.pass;

    const authorizationLevel = 1;

    user.fullName = fullName;
    user.username = username;
    user.zip = zip;
    user.email = email;
    user.phone = phone;
    user.pass = pass;
    user.authorizationLevel = authorizationLevel;

    return user.save().then(result => {
        req.session.fullName = fullName;
        req.session.username = username;
        req.session.zip = zip;
        req.session.phone = phone;
        req.session.email = email;
        req.session.isAuthorized = true;

        res.statusCode = 400;
        res.redirect('/');
    }).catch(err => {

    });
}