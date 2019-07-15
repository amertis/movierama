module.exports = function (userDao, movieDao,ratingDao) {
    const Promise = require('bluebird')
    return {
        load: async function (data) {
            if (data['users']) {
                for (let i = 0; i < data['users'].length; i++) {
                    await userDao.save(data['users'][i])
                }
            }
            if (data['movies']) {
                data['movies'].forEach(async (movie) => {
                    await movieDao.save(movie)
                })
            }
            if(data['ratings']) {
                data['ratings'].forEach(async (rating) => {
                    await ratingDao.save(rating)

                })
            }
            return Promise.resolve()
        },
        cleanup: async function () {
            return Promise.all([await userDao.deleteAll(), await movieDao.deleteAll(), await ratingDao.deleteAll()])
        }
    }
}