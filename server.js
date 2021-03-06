/* jshint esversion: 6 */

const net = require('net');
const fs = require('fs');

let htmlPages = ["index.html", "helium.html", "hydrogen.html", "css/styles.css"];

const server = net.createServer((c) => {
  console.log(c.remoteAddress + " " + c.remotePort + " client connected\n");

  c.on('data', function(data) {
    process.stdout.write(data);
    let url = data.toString().split('\n')[0].split(' ')[1].slice(1);//data buffer to string, split new lines, split on space, then remove '/'

    //if url is blank, aka 8080, redir them to index.html
    if (!url){
      url = "index.html";
    }
    console.log("url is", url);

  if (htmlPages.includes(url)) {
    var page = fs.readFile(url, (err, data) => {
      //console.log(data.toString());
      if (err) throw err;
      var dataLen = data.length;
      c.write(`HTTP/1.1 200 OK\n Server: nginjames/1.3.13 (Macbuntu)\n Date: ${new Date().toUTCString()} local-time\n Content-Type: text/html; charset=utf-8\n Content-Length: ${dataLen}\n Connection: keep-alive\n\n ${data.toString()}`);
      c.destroy();
    });
  }
  else{
    console.log("oh sht 404");
    var dataLen = data.length;
    var fourOhFour = fs.readFile("404.html", (err, data) => {
      c.write(`HTTP/1.1 404 Not Found\n Server: nginjames/1.3.13 (Macbuntu)\n Date: ${new Date().toUTCString()} local-time\n Content-Type: text/html; charset=utf-8\n Content-Length: ${dataLen}\n Connection: keep-alive\n\n ${data.toString()}`);
      c.destroy();
    });
  }
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