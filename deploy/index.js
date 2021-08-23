const  fs = require('fs');
const compressing = require('compressing');
var needle = require('needle');
var ini = require('ini')


let filenames =process.cwd().split("/")
let filename=filenames[filenames.length-1]
console.log(filenames);
var config = ini.parse(fs.readFileSync('config.ini', 'utf-8'))
config.name = filename

fs.writeFileSync('config.ini', ini.stringify(config))


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
