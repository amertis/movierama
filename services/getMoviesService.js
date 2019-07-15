/** @module getMoviesService **/
/**
 * This module is responsible for fetching movie lists. It supports pagination, sorting by 3 fields -
 * [likesCount]{@link Movie#likesCount}, [hatesCount]{@link Movie#hatesCount} and [createdAt]{link Movie#createdAt}, and ordering either ascending or descending.
 * @param movieDao movie data access object
 * @param ratingDao ratings data access object.
 */
module.exports = (movieDao, ratingDao) => {
    const constants = require('../utils/constants')
    const log = require('../log')
    return {
        /**
         * Returns movies uploaded by any user. For each movie, it fetches the rating of the currentUser for the movie,
         * if it exists.
         * @param currentUserId
         * @param page
         * @param sortField
         * @param order
         * @returns {Promise<Movie[]>}
         */
        getMovies: async (currentUserId, page, sortField, order) => {
            log.info(`Request to fetch No ${page} of pages sorted by ${sortField}, ${order} for ${currentUserId}...`)
            let movies = await movieDao.getMovies(page, sortField, order)
            let movieIds = movies.map(movie => movie._id)
            let ratings = await ratingDao.getMoviesRated(currentUserId, movieIds)
            for (let i = 0; i < ratings.length; i++) {
                for (let j = 0; j < movies.length; j++) {
                    if (ratings[i].movieId === movies[j]._id) {
                        movies[j].userRating = ratings[i]
                        break
                    }
                }
            }
            return movies
        },
        /**
         * Returns movies uploaded by a specific user (whose id is posterUserId).
         * @param posterUserId the id of the user whose videos we fetch
         * @param currentUserId the id of the visitor
         * @param page page requested, starting from 0
         * @param sortField one of 'likesCount', 'hatesCount' or 'createdAt'
         * @param order either asc or desc
         * @returns {Promise<Movie[]>}
         */
        getMoviesForUser: async (posterUserId, currentUserId, page, sortField, order) => {
            log.info(`Request to fetch No ${page} of pages sorted by ${sortField}, ${order} from ${posterUserId}...`)
            let movies = await movieDao.getMoviesFromUser(posterUserId, page, sortField, order)
            let movieIds = movies.map(movie => movie._id)
            let ratings = await ratingDao.getMoviesRated(currentUserId, movieIds)
            for (let i = 0; i < ratings.length; i++) {
                for (let j = 0; j < movies.length; j++) {
                    if (ratings[i].movieId === movies[j]._id) {
                        movies[j].userRating = ratings[i]
                        break
                    }
                }
            }
            return movies
        }
    }
}