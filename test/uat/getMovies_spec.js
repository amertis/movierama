const testContainer = require('../testsContainer')
const restClient = testContainer.restClient
const should = require('should')
const userDao = testContainer.userDao
const dataLoader = testContainer.dataLoader
require('../init')

describe('get movies UAT tests', () => {
    beforeEach(async () => {
        await dataLoader.cleanup()
        await dataLoader.load(require('../../fixtures/dataset2'))
    })
    it('should get movies sorted', async () => {
        let res = await restClient.getMovies('testUser1',0,'likes', 'desc')
        console.log(JSON.stringify(res.body))
        should(res.statusCode).eql(200)
    })
    it('should get movies of specific user', async () => {
        let res = await restClient.getMoviesForUser('testUser1',0,'likes', 'desc')
        console.log(JSON.stringify(res.body))
        should(res.statusCode).eql(200)
    })
})