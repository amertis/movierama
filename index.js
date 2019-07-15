const config = require('./config/config')
const dbEngine = config.get('db')
const db = require(`./db/${dbEngine}/db`)(config)
db.init(() => {
    const expressServer = require('./http/expressServer')()
    expressServer.start(() => console.log(`Example app listening on port ??? !`))
})
