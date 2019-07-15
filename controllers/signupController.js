module.exports = (signupService) => {
    const log = require('../log')
    return {
        /**
         * @api {post} /api/signup Registers a new user
         * @apiName Signup
         * @apiDescription User logs in from the client. Users cannot sign up using same username and uuid.
         * @apiGroup User
         * @apiParam {string{5..50}} username a valid email of the user
         * @apiParam {string{5..50}} password
         * @apiParam {string{5..50}} displayName the name of the user
         * @apiSuccess {String} user._id the user's id
         * @apiSuccess {String} user.username the user's username
         * @apiSuccess {String} user.createdAt the user's creation date
         * @apiError ValidationError
         * @apiError error username exists or validation error
         **/
        signup: async function (req, res) {
            log.info({ user: req.body.username }, 'Signing up...')
            const signupValidator = require('../validators/signupValidator')
            try {
                await signupValidator.validate(req)
            } catch (e) {
                log.info(`Invalid input ${e}`)
                return res.status(400).json({ error: `Invalid input: ${e.message}` })
            }
            const result = await signupService.signup(req.body)
            if (result.error) {
                return res.status(400).json(result)
            }
            res.status(200).json(result)
        }
    }
}
