const axios = require('axios');
const ls = require('local-storage')
export function signup(username, pwd, displayName) {
    return axios.post('/api/signup', {
        username: username,
        password: pwd,
        displayName: displayName
    })
}


export function getMoviesForUser (page, order, sortField, userId, posterUserId) {
    return axios.get(`/api/user/${posterUserId}/movie?page=${page}&sortField=${sortField}&order=${order}&userId=${userId}`)

}

export function getMovies(page, order, sortField,currentUserId, posterUserId) {
    return axios.get(`/api/movie?page=${page}&sortField=${sortField}&order=${order}&userId=${currentUserId}`)
}
export function login(username, pwd) {
    return axios.post('/api/login', {
        username: username,
        password: pwd
    })
}

export function rate(userId, movieId,ratingType) {
    let auth = {}
    console.log('Token: '  +ls.get('user')['token'])
    return axios.post('/api/rate', {
        movieId: movieId,
        ratingType: ratingType
    }, {
        headers: {
            Authorization: 'Bearer ' + ls.get('user')['token']
        }
    })
}

export function createMovie(title, description,publicationDate, userId) {
    return axios.post('/api/movie', {
        title: title,
        description: description,
        publicationDate: publicationDate
    }, {
        headers: {
            Authorization: 'Bearer ' + ls.get('user')['token']
        }
    })
}