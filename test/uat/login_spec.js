const testContainer = require('../testsContainer')
const restClient = testContainer.restClient
const should = require('should')
const dataLoader = testContainer.dataLoader
require('../init')

describe('Login Acceptance tests', () => {
    beforeEach(async () => {
        await dataLoader.cleanup()
        await dataLoader.load(require('../../fixtures/dataset'))
    })
    it('Should return 200', async () => {
        let res = await restClient.login("amerths@gmail.com","test")
        should(res.statusCode).eql(200)
        should(res.body.user).be.ok()
        should(res.body.user.token).be.ok()
    })
})