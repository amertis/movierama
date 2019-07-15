const User = require('../../models/mongodb/user')
const mongoose = require('mongoose')
exports.findByUsername = (username) => {
    return User.findOne({username: username}).lean()
}
exports.findById = (id) => {
    return User.findById(id)
}
exports.deleteAll = () => {
    return User.deleteMany({})
}
exports.save = (doc) => {
    if (doc instanceof User) {
        return doc.save()
    } else {
        doc = new User(doc)
        if (!doc._id) {
            doc._id = mongoose.Types.ObjectId()
        }
        return doc.save()
    }
}

