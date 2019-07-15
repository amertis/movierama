const Movie = require('../../models/mongodb/movie')
const mongoose = require('mongoose')
const pageSize = 10;
const log = require('../../log')
exports.save = (doc) => {
    if (doc instanceof Movie) {
        return doc.save()
    } else {
        doc = new Movie(doc)
        if (!doc._id) {
            doc._id = mongoose.Types.ObjectId()
        }
        return doc.save()
    }
}

exports.getMovies = (page, sortField, order) => {
    order = order === 'desc' ? -1 : 1
    page = parseInt(page)
    return Movie.find().limit(pageSize).skip(page*pageSize).sort({[sortField]: order}).populate('user').lean()
}

exports.deleteAll = () => {
    return Movie.deleteMany({})
}

exports.incrementRatingsBy = (movieId, ratingType, cnt) => {
    let updateClause = {}
    if (ratingType === 'like') {
        updateClause['likesCount'] = cnt
    } else {
        updateClause['hatesCount'] = cnt
    }
    return Movie.findOneAndUpdate({_id: movieId},{
        $inc: updateClause
    },{new: true}).populate('user').lean()
}

exports.changeBothRatings = (movieId, ratingType, cnt) => {
    let updateClause = {}
    if (ratingType === 'like') {
        updateClause['likesCount'] = cnt
        updateClause['hatesCount'] = -cnt
    } else {
        updateClause['hatesCount'] = cnt
        updateClause['likesCount'] = -cnt
    }
    return Movie.findOneAndUpdate({_id: movieId},{
        $inc: updateClause
    },{new: true}).populate('user').lean()
}
exports.findById = (movieId) => {
    return Movie.findById(movieId).lean()
}

exports.getMoviesFromUser = (userId, page, sortField, order) => {
    order = order === 'desc' ? -1 : 1
    page = parseInt(page)
    return Movie.find({user: userId}).limit(pageSize).skip(page*pageSize).sort({[sortField]: order}).populate('user').lean()
}