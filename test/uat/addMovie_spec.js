const testContainer = require('../testsContainer')
const restClient = testContainer.restClient
const should = require('should')
const userDao = testContainer.userDao
const dataLoader = testContainer.dataLoader
require('../init')
const config = testContainer.config
const jwtUtil = require('../../utils/jwtUtil')(config)

describe('Add movie UAT tests', () => {
    beforeEach(async () => {
        await dataLoader.cleanup()
        await dataLoader.load(require('../../fixtures/dataset'))
    })
    const tests = [
        {
            given: 'a registered user',
            when: 'he submits a valid movie',
            then: 'the system saves it.',
            statusCode: 200,
            userId: 'testUser1',
            username: 'amerths@gmail.com'
        }
    ]
    tests.forEach((test) => {
        describe(`Given ${test.given}`, () => {
            describe(`When ${test.when}`, () => {
                it('should add movie', async () => {
                    let jwt = jwtUtil.create(test.userId, test.username)
                    let res = await restClient.addMovie({
                        title: 'Matrix',
                        description: 'An awesome movie',
                        publicationDate: 1999
                    }, jwt)
                    should(res.statusCode).eql(test.statusCode)
                })
            })
        })
    })

})