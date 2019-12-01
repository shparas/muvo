const jwt = require('jsonwebtoken');

const jwtKey = require('fs').readFileSync('./2.2-data/jwt.key');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];	// Bearer TOKEN
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, jwtKey);
        if (decodedToken.time < (Date.now() / 1000 - 3600)) {
            const error = new Error('Not authenticated. Token timed out.');
            error.statusCode = 401;
            throw error;
        }
    } catch (err) {
        err.statusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    req.jwt = decodedToken;
    next();
};