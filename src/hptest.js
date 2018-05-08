var http = require('http');

var myweb = http.createServer();

myweb.on('error', function(err) {
    console.log('Sad panda: ' + err);
});

myweb.on('request', function(request, response) {
    console.log('Handling HTTP request');
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<b>Hello World</b>');
    response.end();
});

myweb.listen(8080);