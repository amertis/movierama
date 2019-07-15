const Joi = require('joi')
const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(16).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(3).required()
})
exports.validate = (req) => {
    return Joi.validate(req.body, schema)
}