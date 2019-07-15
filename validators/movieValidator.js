const Joi = require('joi')
const schema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(10).max(2000).required(),
    publicationDate: Joi.number().integer().min(1880)
})
exports.validate = (req) => {
    return Joi.validate(req.body, schema)
}