var util = require('../utils/helpers.js')

// attach all function of util to req.helpers
module.exports = (req, res, next) => {
    req.helpers = util;
    req.log = req.helpers.log;  // just a shortcut
    next();
}