const {https}= require('../utils/http.js')
const  fs = require('fs');
const compressing = require('compressing');
var needle = require('needle');


let conf = fs.createReadStream('config.ini');
let out = fs.createWriteStream('example/dist/config.ini');
conf.pipe(out)

compressing.zip.compressDir('example/dist', 'dist.zip')
    .then(() => {
        let buffer = fs.readFileSync('dist.zip');
        let data = {
            file: {
                buffer       : buffer,
                filename     : 'mypackage.zip',
                content_type : 'application/octet-stream'
            }
        }
        let url="http://localhost:3200/file/upload"
        needle.post(url, data, { multipart: true }, function(err, resp, body) {})
    })
    .catch(err => {
        console.error(err);
    })
