module.exports = (userDao, config) => {
    const bcrypt = require('bcrypt')
    const jwtUtil = require('../utils/jwtUtil')(config)
    const log = require('../log')
    return {
        login: async function (username, pwd)  {
            let user = await userDao.findByUsername(username)
            if (!user) {
                log.error('User not found on db')
                return false
            }
            let result = await bcrypt.compare(pwd, user.password)
            if (!result) {
                log.error('Invalid password')
                return null
            }
            let hash = jwtUtil.create(user._id, username)
            user.token = hash
            return user
        }
    }
}