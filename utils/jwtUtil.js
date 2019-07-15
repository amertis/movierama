module.exports = (config) => {
    const rs = require('jsrsasign');
    const key = config.get('jwtSecret')
    const log = require('../log')
    return {
        create: function (userId, username) {
            let oHeader = {alg: 'HS256', typ: 'JWT'};
            var tEnd = rs.KJUR.jws.IntDate.get('now + 1day');
            let oPayload = {
                _id: userId,
                username: username,
                exp: tEnd
            }
            var sHeader = JSON.stringify(oHeader);
            var sPayload = JSON.stringify(oPayload);
            return rs.KJUR.jws.JWS.sign('HS256', sHeader, sPayload, key);
        },
        verify: function (jwt) {
            let isValid = false
            try {
                isValid = rs.KJUR.jws.JWS.verifyJWT(jwt, key, {alg: ['HS256']})
            } catch (e) {
                log.error({invalidToken: jwt}, e)
                return false;
            }
            if (!isValid) {
                return false;
            }
            let s2 = Buffer.from(jwt.split('.')[1], 'base64').toString('ascii');
            return rs.KJUR.jws.JWS.readSafeJSONString(s2);
        }
    }
}
