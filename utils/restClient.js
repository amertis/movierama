const request = require('supertest')
const bcrypt = require('bcrypt')
const config = require('../config/config')
const url = `http://localhost:${config.get('port')}`
exports.login = async (username, pwd) => {
    return request(url).post('/api/login').send({username:username, password: pwd})
}

exports.signup = async (username, pwd, displayName) => {
    return request(url).post('/api/signup').send({username:username, password: pwd, displayName: displayName})
}

exports.rate = async (rating, jwt) => {
    return request(url).post('/api/rate').set('Authorization', `Bearer ${jwt}`).send({userId: rating.userId, movieId: rating.movieId, ratingType: rating.ratingType})
}

exports.addMovie = async (movie, jwt) => {
    return request(url).post('/api/movie').set('Authorization', `Bearer ${jwt}`).send(movie)
}

exports.getMovies = async (userId, page, sortingField, order) => {
    return request(url).get(`/api/movie?page=${page}&sort=${sortingField}&order=${order}`).send()
}

exports.getMoviesForUser = async (userId, page, sortingField, order) => {
    return request(url).get(`/api/user/${userId}/movie?page=${page}&sort=${sortingField}&order=${order}`).send()
}