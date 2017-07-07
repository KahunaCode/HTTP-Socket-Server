/* jshint esversion: 6 */

const net = require('net');
const fs = require('fs');

let client_list = [];

const server = net.createServer((c) => {
  console.log(c.remoteAddress + " " + c.remotePort + " client connectedn\n");

  client_list.push(c.socket);

  c.on('data', function(data) {
    process.stdout.write(data);
    var uri = data.toString();
    uri = uri.split('\n')[0].split(' ')[1].slice(1);//split new lines, split on space, then remove '/'
    console.log("uri is", uri);

  var helium = fs.readFile("helium.html", (err, data) => {
    //console.log(data.toString());
    if (err) throw err;
    //console.log("c is ", c);
    //c.write("HTTP/1.1 200 OK");
    c.write("HTTP/1.1 200 OK\n Server: nginjames/1.4.6 (Macbuntu)\n Date: Wed, 05 Jul 2017 22:32:15 GMT\n Content-Type: text/html; charset=utf-8\n Content-Length: 40489\n Connection: keep-alive"+"\n\n"+data.toString());
    c.destroy();
  });

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