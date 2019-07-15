const should = require('should')

describe('loginValidator unit tests', () => {
    const tests = [{
        req: {
            body: {
                username: 'test',
                password: 'test'
            }
        },
        error: 'child "password" fails because ["password" length must be at least 6 characters long]',
        desc: 'should not accept password lengh < 6'
    },
    ]
    const loginValidator = require('../../validators/loginValidator')
    tests.forEach(test => {
        it(`${test.desc}`, async () => {
            let res;
            try {
                res = await loginValidator.validate(test.req)
            } catch ( err ){
                should(err.message).eql(test.error)
            }

        })
    })
})