/* jshint esversion: 6 */

const net = require('net');

let client_list = [];

const server = net.createServer((c) => {
  console.log(c.remoteAddress + " " + c.remotePort + " client connected");

  client_list.push(c.socket);

  c.on('data', function(data) {
    process.stdout.write(data);

  //socket.write("HTTP/1.1 200 OK");
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