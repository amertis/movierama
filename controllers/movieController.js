module.exports = (addMovieService, getMoviesService) => {
    const log = require('../log')
    return {
        /**
         * @api {post} /api/movie Submits a new movie
         * @apiName Submit Movie
         * @apiDescription A register user can submit and store a new movie.
         * @apiGroup Movie
         * @apiParam {title{2..100}} title the title of the movie
         * @apiParam {string{2..2000}} description a description of the movie
         * @apiParam {number} publicationDate the date the movies was published
         *
         * @apiSuccess {String} movie._id the movie's id
         **/
        addMovie: async function (req, res) {
            const movieValidator = require('../validators/movieValidator')
            try {
                await movieValidator.validate(req)
            } catch (e) {
                log.error(e)
                return res.status(400).json({error: e.message})
            }
            let movie;
            try {
                movie = await addMovieService.add(req.body.title, req.body.description, req.body.publicationDate, req.user._id)
            } catch (e) {
                log.error(e)
                return res.status(400).json({error: e.message})
            }
            return res.status(200).json({movie: movie})
        },
        /**
         * @api {get} /api/movie fetches movies by everyone
         * @apiName Fetch movies
         * @apiDescription Fetches all movies paginated
         * @apiGroup Movie
         **/
        getMovies: async function (req, res) {
            let page = req.query.page || 0
            let order = req.query.order || 'desc'
            let sortField = req.query.sortField || 'likesCount'
            let resp = await getMoviesService.getMovies(req.query.userId, page, sortField, order)
            res.status(200).json({response: resp})
        },
        /**
         * @api {get} /api/user/:userId/movies Fetches movies of a user
         * @apiName Fetch movies of a user
         * @apiDescription Fetches all movies uploaded by a user paginated
         * @apiGroup User
         **/
        getMoviesForUser: async function (req, res) {
            let page = req.query.page || 0
            let order = req.query.order || 'desc'
            let sortField = req.query.sortField || 'likesCount'
            let resp = await getMoviesService.getMoviesForUser(req.params.id, req.query.userId, page, sortField, order)
            res.status(200).json({response: resp})
        }
    }
}