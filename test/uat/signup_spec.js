const testContainer = require('../testsContainer')
const restClient = testContainer.restClient
const should = require('should')
const userDao = testContainer.userDao
const dataLoader = testContainer.dataLoader
require('../init')

describe('Signup UAT tests', () => {
    let instance;

    beforeEach(async () => {
        await dataLoader.cleanup()
        await dataLoader.load(require('../../fixtures/dataset'))
    })
    const tests = [{
        given: 'the email does not exist',
        when: 'the user signs up with valid input',
        then: 'he signs-up successfully',
        username: 'newEmail@gmail.com',
        password: 'password',
        displayName: 'Aristotelis Mertis',
        statusCode: 200,
        error: undefined
    }, {
        given: 'the email exists',
        when: 'the user signs up with an existing email',
        then: 'the system returns error',
        username: 'amerths@gmail.com',
        password: 'password',
        displayName: 'Aristotelis Mertis',
        statusCode: 400,
        error: 'User already exists'
    }]
    tests.forEach((test) => {
        describe(`Given ${test.given}`, () => {
            describe(`When ${test.when}`, () => {
                it(`Then ${test.then}`, async () => {
                    let res = await restClient.signup(test.username, test.password, test.displayName)
                    should(res.statusCode).eql(test.statusCode)
                    // should(res.body.token).be.ok()
                    should(res.body.error).eql(test.error)
                    if (res.body.user) {
                        should(res.body.user._id).be.ok()
                        should(res.body.user.username).eql(test.username)
                        should(res.body.user.displayName).eql('Aristotelis Mertis')
                        should(res.body.user.password).be.undefined()
                    }
                })
            })
        })
    })

    after(() => {
    })
})