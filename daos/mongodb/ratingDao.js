const Rating = require('../../models/mongodb/rating')
const mongoose = require('mongoose')

exports.getMoviesRated = (userId, movieIds) => {
    return Rating.find({userId: userId, movieId: {$in: movieIds}})
}

exports.save = (doc) => {
    if (doc instanceof Rating) {
        return doc.save()
    } else {
        doc = new Rating(doc)
        if (!doc._id) {
            doc._id = mongoose.Types.ObjectId()
        }
        return doc.save()
    }
}

exports.removeRating = (userId, movieId, ratingType) => {
    return Rating.deleteOne({userId: userId, movieId: movieId, ratingType: ratingType})
}

exports.deleteAll = () => {
    return Rating.deleteMany({})
}

exports.getRating = (userId, movieId) => {
     return Rating.findOne({userId: userId, movieId: movieId})
}

exports.updateExistingRating = (userId, movieId, newRatingType) => {
    let opposite = newRatingType === 'like' ? 'hate' : 'like'
    return Rating.findOneAndUpdate({userId: userId, movieId: movieId, ratingType: opposite}, {$set :{ ratingType: newRatingType}})
}