const mongoose = require('mongoose')
module.exports = (config) => {
    const log = require('../../log')
    let db;
    return {
        init : function (cb) {
            mongoose.connect(config.get('dbUri'), { useNewUrlParser: true,  useCreateIndex: true, useFindAndModify: false})
            db = mongoose.connection;
            // var format = require('util').format;
            // mongoose.set('debug', function (coll, method, query, doc) {
            //     log.info(format('db.%s.%s(%s)', coll, method, JSON.stringify(query)))
            //     // log.info("Mongoose query: db." + coll + "."+method +"("+ JSON.stringify(query) + JSON.stringify(doc));
            // });
            db.on('error', err => {
                console.error('MongoDB connection error: ' + new Error(err.stack));
            });
            db.once('open', function callback () {
                console.log('Connected to MongoDB\n');
                cb()
            });
            db.on('close', () => {
                console.log('closing')
            })
        },
        close: function (cb) {
            if (db) {
                db.close(cb)
            }
        }
    }
}