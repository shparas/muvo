module.exports = (req, res, next) => {
    if (!req.session.isAuthorized) {
        return res.redirect('/');
    }
    next();
}

