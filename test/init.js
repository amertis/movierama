const testContainer = require('./testsContainer')
const expressServer = testContainer.httpServer
const db = testContainer.db
let appServer;
before((done) => {
        db.init(() => {
            console.log('db started')
            try {
                expressServer.start(function (server){
                    appServer = server
                    console.log('started')
                    done()
                })
            }catch(e) {
                console.error(e)
                done(e)
            }

            console.log('finish')
    })
})

after((done) => {
    expressServer.stop(function() {
        db.close(done)
    })
    // process.exit(0)
    // appServer.close()
})