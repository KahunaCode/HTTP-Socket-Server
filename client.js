/* jshint esversion: 6 */


/*
HEAD /webpage.html HTTP/1.1
Host: 0.0.0.0:8080
User-agent: curl/7.43.0
Accept: *\/*

*/

const net = require('net');



const socket = net.connect(8080, process.argv[2], () => {
  console.log('client connected');
});


socket.setEncoding('utf8');

socket.on('data', function(data){
  console.log("msg: ",data);
});

var chunk = "GET / HTTP/1.1";
socket.write(chunk);

// process.stdin.setEncoding('utf8');
// process.stdin.on('readable', () => {
//   var chunk = "HEAD www.google.com HTTP/1.1\nHost: www.google.com\nUser-agent: node net\nAccept: */*";
//   if (chunk !== null) {
//     //process.stdout.write("stdout: "+chunk);
//     //socket.write("RandoMan"+name+' '+chunk);
//     socket.write(chunk);
//   }
// });


console.log("checking", process.argv[2]);


socket.on('close', () => {
  console.log("connection closed");
});