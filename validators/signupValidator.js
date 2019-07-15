/**
 * @module signupValidator
 * Validates the signup request.
 */
const Joi = require('joi')
const schema = Joi.object({
    username: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(5).max(50).required(),
    displayName: Joi.string().min(3).max(50).required()
})
exports.validate = (req) => {
    return Joi.validate(req.body, schema)
}