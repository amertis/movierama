// // var zlib = require('zlib');
// // const fileContents = fs.createReadStream('./fixtures/movies.json.gz')
// // const unzip = zlib.createGunzip();
// // fileContents.pipe(unzip).pipe(writeStream);
// const {chain}  = require('stream-chain');
// const {parser} = require('stream-json');
// const {streamArray} = require('stream-json/streamers/StreamArray');
// const jsonfile = require('jsonfile')
//
// const file = '/tmp/data.json'
// const obj = { name: 'JP' }
//
// const fs   = require('fs');
// const zlib = require('zlib');
// const path = require('path')
// const pipeline = chain([
//     fs.createReadStream(path.resolve(__dirname,'fixtures/movies.json.gz')),
//     zlib.createGunzip(),
//     parser(),
//     streamArray(),
//     data => {
//         const value = data.value;
//         return value && value.department === 'accounting' ? data : null;
//     }
// ]);
//
// let counter = 0;
// pipeline.on('data', () => ++counter);
// pipeline.on('end', () =>
//     console.log(`The accounting department has ${counter} movies.`));


// Use:
let test = requireGZ('./fixtures/movies.json.gz');