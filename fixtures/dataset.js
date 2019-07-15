module.exports = {
    "users": [{
        "_id": "testUser1",
        "username": "amerths@gmail.com",
        "password": "$2b$10$wKPls258bYgNQP3nrHoUuOHPLxms0dliyRbOtGl2B2/yy.Q.FQ16u",
        "displayName": "Aris Mertis"
    }, {
        "_id": "testUser2",
        "username": "amerths2@gmail.com",
        "password": "$2b$10$wKPls258bYgNQP3nrHoUuOHPLxms0dliyRbOtGl2B2/yy.Q.FQ16u",
        "displayName": "Aris Mertis 2"
    }],
    "movies": [{
        "_id": '1',
        "title": "Lord of the rings",
        "description":"Awesome movie",
        "user": "testUser2",
        "likesCount": 100
    }, {
        "_id": '2',
        "title": "Lord of the rings 2",
        "description":"Awesome movie 2 ",
        "user": "testUser2",
        "likesCount": 200,
        "hatesCount": 10
    }],
    "ratings": [{
        "_id": 1,
        "userId": 'testUser1',
        "movieId": '2',
        "ratingType": "like"
    }]
}
