/** @module rateMovieService **/
/* This module has all business logic for handling ratings. There are four types of ratings:
 * (a) like
 * (b) hate
 * (c) unlike
 * (d) unhate
 *
 * Likes and hates first check whether a past opposite user rating exists for the movie from the one the user now submits.
 * If it exists, it will update the rating and then it will change the rating counters of the movie for both likes and hates.
 * If a opposite user rating doesn't exist, then the system attempts to create a new rating. If the rating already exists,
 * the unique constraint of the pair (user/movie) in the ratings collection will block the procedure. Otherwise, the
 * procedure will continue and will end with the counter update.
 *
 * Unlikes and unhates just reverse the effects of likes and hates. They will remove the rating from the collection and
 * afterwards, they will decrement the corresponding counter.
 *
 * The function returns the new movie, or an appropriate error.
 * @param userDao
 * @param ratingDao
 * @param movieDao
 * @returns {{rate: rate}}
 */
module.exports = (userDao, ratingDao, movieDao) => {
    const constants = require('../utils/constants')
    const Promise = require('bluebird')
    const log = require('../log')
    const map = {
        [constants.RATING_TYPE_LIKE]: 1,
        [constants.RATING_TYPE_HATE]: 1,
        [constants.RATING_TYPE_UNLIKE]: -1,
        [constants.RATING_TYPE_UNHATE]: -1
    }
    return {
        rate: async function (userId, movieId, ratingType) {
            log.info(`Received rating of type ${ratingType} from ${userId}, for ${movieId}`)
            let movie = await movieDao.findById(movieId)
            if (movie.user === userId) {
                throw new Error('User not allowed to rate own movie.')
            }
            let count;
            switch(ratingType) {
                case constants.RATING_TYPE_UNLIKE:
                case constants.RATING_TYPE_UNHATE:{
                    let rt = ratingType === constants.RATING_TYPE_UNLIKE ? constants.RATING_TYPE_LIKE : constants.RATING_TYPE_HATE
                    let resp = await ratingDao.removeRating(userId, movieId, rt)
                    count = resp.deletedCount
                    if (count) {
                        return movieDao.incrementRatingsBy(movieId, rt, map[ratingType])
                    } else {
                        throw new Error('user has not rated the movie.')
                    }
                }
                case constants.RATING_TYPE_LIKE:
                case constants.RATING_TYPE_HATE: {
                    let originalRating = await ratingDao.updateExistingRating(userId, movieId, ratingType)
                    if (!originalRating) {
                        try{
                            userRating = await ratingDao.save({
                                userId: userId,
                                movieId: movieId,
                                ratingType: ratingType
                            })
                        } catch(e) {
                            log.error(e)
                            if (e.code === 11000) {
                                throw new Error(`User has already ${ratingType}d the movie.`)
                            }
                        }
                        movie = await movieDao.incrementRatingsBy(movieId, ratingType, map[ratingType])
                        movie.userRating = userRating.toJSON()
                    } else {
                        originalRating.ratingType = ratingType
                        movie = await movieDao.changeBothRatings(movieId, ratingType, map[ratingType])
                        movie.userRating = originalRating.toJSON()
                    }
                    return Promise.resolve(movie)
                }
                default: {
                    throw new Error(`Invalid ratingType ${ratingType}`)
                }
            }

        }
    }
}