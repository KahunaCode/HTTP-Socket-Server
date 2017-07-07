/* jshint esversion: 6 */

const net = require('net');

const socket = net.connect(8080, '0.0.0.0', () => {
  console.log('client connected');
});





socket.on('close', () => {
  console.log("connection closed");
});