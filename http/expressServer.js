module.exports = () => {
    const express = require('express')
    const config = require('../config/config')
    const userDao = require('../daos/mongodb/userDao')
    const movieDao = require('../daos/mongodb/movieDao')
    const ratingDao = require('../daos/mongodb/ratingDao')
    const loginService = require('../services/loginService')(userDao, config)
    const signupService = require('../services/signupService')(userDao, config)
    const rateMovieService = require('../services/rateMovieService')(userDao, ratingDao, movieDao)
    const getMoviesService = require('../services/getMoviesService')(movieDao, ratingDao)
    const addMoviesService = require('../services/addMovieService')(movieDao, userDao)
    const loginController = require('../controllers/loginController')(loginService)
    const signupController = require('../controllers/signupController')(signupService)
    const movieController = require('../controllers/movieController')(addMoviesService, getMoviesService)
    const rateController = require('../controllers/rateController')(rateMovieService)
    const bodyParser = require('body-parser')
    const path = require('path')
    const auth = require('../middleware/auth')(config).auth
    let appServer;
    return {
        start: function (cb) {
            const app = express()
            const port = 5000

            app.use(bodyParser.json())
            app.use(express.static('client/build'))

            app.use(express.static('coverage'))
            app.use(express.static('mochawesome-report'))
            app.use(express.static('docs'))

            app.get('/site/*', (req, res) => {
                res.sendFile(path.resolve(__dirname, '../client/build/index.html'))
            })
            app.post('/api/login', loginController.login)
            app.post('/api/rate', auth, rateController.rate)
            app.post('/api/signup', signupController.signup)
            app.post('/api/movie',auth, movieController.addMovie)
            app.get('/api/movie', movieController.getMovies)
            app.get('/api/user/:id/movie', movieController.getMoviesForUser)
            appServer =  app.listen(port, cb)
        },
        stop: function (cb) {
            if (appServer) {
                appServer.close(cb)

            }
        }
    }
}