const mongoose = require('mongoose')
let user = {
    "_id": "testUser1",
    "username": "amerths@gmail.com",
    "password": "$2b$10$wKPls258bYgNQP3nrHoUuOHPLxms0dliyRbOtGl2B2/yy.Q.FQ16u"
}
let movies = []
let ranks = []
for (let i = 0; i < 100; i++) {
    let id = mongoose.Types.ObjectId().toHexString()
    movies.push({
        "_id": id,
        "title": "Lord of the rings",
        "description":"Awesome movie",
        "user": "testUser1"
    })
    ranks.push( {
        movieId: id,
        score: i*100
    })

}

module.exports = {
    "users": [user],
    "movies": movies,
    "ranks": ranks
}