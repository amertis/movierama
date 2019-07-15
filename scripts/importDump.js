async function load() {
    const testContainer = require('../test/testsContainer')
    testContainer.db.init(async () => {
        const dataLoader = require('../testutils/dataLoader')(testContainer.userDao, testContainer.movieDao, testContainer.ratingDao)
        await dataLoader.cleanup()
        await dataLoader.load(require('../fixtures/dump'))
        testContainer.db.close()
    })
}
load()