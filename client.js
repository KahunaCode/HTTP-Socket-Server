/* jshint esversion: 6 */


/*
HEAD /webpage.html HTTP/1.1
Host: 0.0.0.0:8080
User-agent: curl/7.43.0
Accept: *\/*

*/

const net = require('net');

var remoteAddress = "";

var connection = process.argv[2];

var port = 80;

if (connection.includes(':')){
  var port = connection.split(':')[1];
  connection = connection.split(':')[0];
}

if (!connection){
  console.log("that won't work, try this: 'node client.js www.google.com'");
}
else{
  const socket = net.connect(port, connection, () => {
    console.log('client connected');
    var remoteAddress = socket.remoteAddress;
    console.log('remote address is', remoteAddress);
    });

  socket.setEncoding('utf8');

  var chunk = `GET / HTTP/1.1\nHost: ${remoteAddress}\nConnection: close\r\n\r\n`;
  socket.write(chunk);

  socket.on('data', function(data){
    process.stdout.write(data);
  });

  socket.on('close', () => {
    console.log("connection closed");
  });

}