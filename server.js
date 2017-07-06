const net = require('net');

const server = net.createServer((c) => {
  console.log(c.remoteAddress + " " + c.remotePort + " client connected");

  c.on('end', () => {
    console.log("disconnected");
  });

});


server.on('error', (err) => {
  throw err;
});

server.listen('8080', () => {
  console.log('server bound');
});