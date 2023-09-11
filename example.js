const dgram = require('dgram');
const { Decoder } = require('.');

const client = dgram.createSocket('udp4');

const psnDecoder = new Decoder();

client.on('listening', () => {
  client.addMembership('236.10.10.10');
});

client.on('message', (message) => {
  psnDecoder.decode(message);
});

client.bind(56565, '0.0.0.0');
