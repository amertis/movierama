/** @namespace Rating */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    /**
     * a unique system identifier for ratings. Auto-indexed.
     * @type {String}
     * @memberOf User#
     */
    _id: String,
    /**
     * the id of the user which submitted the rating
     * @type {String}
     * @memberOf User#
     */
    userId: String,
    /**
     * the movie id the rating refers to
     * @type {String}
     * @memberOf User#
     */
    movieId: String,
    /**
     * the rating submission date
     * @type {Date}
     * @memberOf User#
     */
    createdAt: {
        type: Date,
        default: Date.now
    },
    /**
     * the rating type: either 'like' or 'hate'
     * @type {String}
     * @memberOf User#
     */
    ratingType: String
})

schema.index({ 'userId': 1, 'movieId':1}, {unique: true})

const model = mongoose.model('Rating', schema);
module.exports = model;