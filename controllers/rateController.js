module.exports = (rateMovieService) => {
    const log = require('../log')
    return {
        /**
         * @api {post} /api/rate Rates or unrates a movie
         * @apiName Rate Movie
         * @apiDescription Users can (un)like or (un)hate a movie. They cannot rate movies they have uploaded or already
         * rated. As a result of the call, the number of likes or hates of the movie is updated.
         * @apiGroup Movie
         * @apiParam {string="like", "hate", "unlike", "unhate"} ratingType
         * @apiParam {string} user the user's id
         * @apiParam {string} movieId the relevant movie id
         *
         * @apiSuccess {String} movie._id the movie's id
         * @apiSuccess {String} title the movies's title
         * @apiSuccess {String} description the movies's description
         * @apiSuccess {Date} createdAt the movie's record creation date
         * @apiSuccess {Number} likesCount the movie's number of likes
         * @apiSuccess {Number} hatesCount the movie's number of hates
         * @apiError ValidationError
         * @apiError error User not allowed to rate own movie.or User has not rated this movie.
         **/
        rate: async function (req, res) {
            const ratingValidator = require('../validators/ratingValidator')
            try {
                ratingValidator.validate(req)
            } catch (e) {
                return res.status(400).json({ err: e.message });
            }
            let movie;
            try {
                movie = await rateMovieService.rate(req.user._id, req.body.movieId, req.body.ratingType)
            } catch (e) {
                log.error(e)
                return res.status(400).json({ error: e.message })
            }
            res.status(200).json({ movie: movie })
        }
    }
}
