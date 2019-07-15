const Joi = require('joi')
const schema = Joi.object({
    body: {
        ratingType: Joi.string().valid(['like', 'hate', 'unlike', 'unhate']).required(),
        movieId: Joi.string().required()
    },
    user: {
        _id: Joi.string().required(),
        username: Joi.string().required()
    }
})
exports.validate = (req) => {
    return Joi.validate(req, schema, {allowUnknown: true})
}