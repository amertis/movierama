/** @namespace Movie */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema({
    /**
     * a unique system identifier for users. Auto-indexed.
     * @type {String}
     * @memberOf User#
     */
    _id: String,
    /**
     * the user's email
     * @type {String}
     * @memberOf User#
     */
    username: {
        type: String
    },
    /**
     * the user's name to be publicly displayed
     * @type {String}
     * @memberOf User#
     */
    displayName: {
        type: String
    },
    /**
     * the password encrypted with the bcrypt hashing function
     * @type {String}
     * @memberOf User#
     */
    password: String,
    /**
     * date the user was created
     * @type {Date}
     * @memberOf User#
     */
    createdAt: {
        type: Date,
        default: Date.now
    }
})
schema.index({ 'username': 1 }, { 'unique': true })
const model = mongoose.model('User', schema);

module.exports = model;