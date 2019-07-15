module.exports = (movieDao, userDao) => {
    return {
        add: async function (title, description, publicationDate, userId) {
            let user = await userDao.findById(userId)
            if (!user) {
                throw new Error('User does not exist')
            }
            let movie = await movieDao.save({
                title, description, publicationDate, user: userId
            })
        }
    }
}