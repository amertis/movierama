module.exports = (loginService) => {
    return {
        /**
         * @api {post} /api/login User Login
         * @apiName Login
         * @apiDescription User login
         * @apiGroup User
         * @apiParam {string{5..50}} username a valid email of the user
         * @apiParam {string{5..50}} password
         * @apiSuccess {String} user._id the user's id
         * @apiSuccess {String} user.username the user's username
         * @apiSuccess {String} user.createdAt the user's creation date
         **/
        login: async function(req, res) {
            const loginValidator = require('../validators/loginValidator')
            try {
                loginValidator.validate(req)
            } catch (e) {
                return res.status(400).json({error: 'Invalid username or password'})
            }
            let username = req.body.username
            let pwd = req.body.password
            console.log(`${username} - ${pwd}`)
            let result = await loginService.login(username, pwd)
            if (!result) {
                return res.status(400).json({error: 'Invalid username or password'})
            }
            res.status(200).json({user: result})
        }
    }
}