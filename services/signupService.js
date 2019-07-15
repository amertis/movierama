module.exports = (userDao, config) => {
    const jwtUtil = require('../utils/jwtUtil')(config)
    const bcrypt = require('bcrypt')
    return {
        signup: async (userJson) => {
            userJson.password = await bcrypt.hash(userJson.password, 10)
            let user;
            try {
                user = await userDao.save(userJson)
            } catch (e) {
                let error = ''
                if (e.code === 11000) {
                    error = 'User already exists'
                }
                console.error(e);
                return {
                    error: error
                }
            }
            let token = jwtUtil.create(user._id, user.username)
            user = user.toJSON()
            user.token = token
            // hide password hash
            user.password = undefined
            return {
                user: user
            }
        }
    }
}