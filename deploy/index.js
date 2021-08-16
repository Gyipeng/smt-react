const {https}= require('../utils/http.js')
const  fs = require('fs');
const compressing = require('compressing');
var needle = require('needle');


fs.copyFileSync("config.ini", 'dist/config.ini')
compressing.zip.compressDir('dist', 'dist.zip')
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
