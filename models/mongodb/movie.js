/** @namespace Movie */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    /**
     * a unique system identifier for the movie
     * @type {String}
     * @memberOf Movie#
     */
    _id: String,
    /**
     * the title of the movie
     * @type {String}
     * @memberOf Movie#
     */
    title: String,
    /**
     * description of the movie
     * @type {String}
     * @memberOf Movie#
     */
    description: String,
    /**
     * date the movie was submitted by a user
     * @type {String}
     * @memberOf Movie#
     */
    createdAt: {
        type: Date,
        default: Date.now
    },
    /**
     * reference to the poster of the movie. It is actually a [user id]{@link User#_id}.
     * @type {String}
     * @memberOf Movie#
     */
    user: { type: String, ref: 'User' },
    /**
     * the movie's production date
     * @type {Number}
     * @memberOf Movie#
     */
    publicationDate: Number,
    /**
     * the number of likes the movie has attracted
     * @type {Number}
     * @memberOf Movie#
     */
    likesCount: {
        type: Number,
        default: 0
    },
    /**
     * the number of hates the movie has attracted
     * @type {Number}
     * @memberOf Movie#
     */
    hatesCount: {
        type: Number,
        default: 0
    }
})
schema.index({ 'likesCount': 1 })
schema.index({ 'hatesCount': 1 })
schema.index({ 'createdAt': 1 })

const model = mongoose.model('Movie', schema);
module.exports = model;