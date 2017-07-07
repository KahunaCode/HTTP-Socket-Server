/* jshint esversion: 6 */

const net = require('net');

let client_list = [];

const server = net.createServer((c) => {
  console.log(c.remoteAddress + " " + c.remotePort + " client connected");

  client_list.push(c.socket);

  c.on('data', function(data) {
    process.stdout.write(data);

  c.write("HTTP/1.1 200 OK, Server: nginx/1.4.6 (Ubuntu), Date: Wed, 05 Jul 2017 22:32:15 GMT Content-Type: text/html; charset=utf-8, Content-Length: 40489, Connection: keep-alive");
  });

  c.on('end', () => {
    console.log("disconnected");
  });

});

server.on('error', (err) => {
  throw err;
});

server.listen('8080', '0.0.0.0', () => {
  console.log('server bound');
});