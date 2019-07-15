const nconf = require('nconf');
const env = process.env.NODE_ENV;
const configPath = './config/config.json';
nconf.argv()
    .env()
    .file('global', { file: configPath });
module.exports = nconf;