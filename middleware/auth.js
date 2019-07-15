module.exports = (config) => {
    const jwtUtil = require('../utils/jwtUtil')(config)
    return {
        auth: function (req, res, next) {
            let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
            if (!token) {
                return res.status(400).json({
                    error: 'No auth token supplied'
                });
            }
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
            let response = jwtUtil.verify(token, config.get('jwtSecret'))
            if (!response) {
                return res.status(400).json({
                    error: 'Token is not valid'
                });
            }
            req.user = response;
            next();
        }
    }
}
