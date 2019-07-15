function loadMovies () {
    const Module = require('module');
    const zlib   = require('zlib');
    const fs     = require('fs');
    const mongoose = require('mongoose')
    let users = []
    for (let i = 1; i < 100; i++) {
        users.push({
            "_id": `testUser${i}`,
            "username": `testUser${i}@gmail.com`,
            "password": "$2b$10$3EHQvkvowIJm586i3Rk5SeF4C7GECsC51F0iqAcF0QhnA0ONKmbuS", //test
            "displayName": `testUser_${i}`
        })
    }
    let movies = require('./movies.json').movies
    let ratings = []
    movies = movies.map((movie) => {
        let id = mongoose.Types.ObjectId().toHexString()
        let uploaderUser = `testUser${Math.floor(Math.random() * 100) + 1}`
        let ratingTypes = ['like', 'hate', 'none']
        let likesCount = 0;
        let hatesCount = 0;
        for (let i = 0; i < users.length; i++) {
            let randomRating = ratingTypes[Math.floor(Math.random() * 3)]
            if (randomRating !== 'none' && users[i]._id !== uploaderUser) {
                ratings.push({
                    userId: users[i]._id,
                    movieId: id,
                    ratingType: randomRating
                })
            }
            if (randomRating === 'like') {
                likesCount++
            }
            if (randomRating === 'hate') {
                hatesCount++
            }

        }
        return {
            _id: id,
            title: movie.title,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            likesCount: likesCount,
            hatesCount: hatesCount,
            createdAt: new Date(new Date().getTime() + Math.random() * (new Date()) - new Date(2002,1,1)),
            publicationDate: movie.publicationDate,
            user: uploaderUser
        }
    })
    return {
        users: users,
        movies: movies,
        ratings: ratings
    }
}
module.exports = loadMovies()
