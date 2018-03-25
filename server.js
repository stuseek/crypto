let http = require('http');
let fs = require('fs');
let url = require('url');
let cron = require('./cron');
let model = require('./model');

http.createServer(function (req, res) {
    fs.readFile('views/index.html', function (err, data) {
        if (req.url === '/getRates') {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(JSON.stringify(model.getData()));
            res.write('test')
            res.end()
        } else {
            if (req.url.indexOf('/images/') > -1) {
                let img = fs.readFileSync('.' + req.url);
                res.writeHead(200, {'Content-Type': 'image/JPEG'});
                res.end(img, 'binary');
            } else if (req.url.indexOf('/scripts/') > -1) {
                let js = fs.readFileSync('.' + req.url);
                res.writeHead(200, {'Content-Type': 'application/javascript'});
                res.end(js, 'binary');
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }
        }
    });
}).listen(80);
