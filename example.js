const dgram = require('dgram');
const { Decoder } = require('.');

const client = dgram.createSocket('udp4');

const psnDecoder = new Decoder();

client.on('listening', () => {
  const address = client.address();
  client.setBroadcast(true);
  client.setMulticastTTL(128);
  client.addMembership('236.10.10.10');
});

client.on('message', (message, remote) => {
  psnDecoder.decode(message);
});

client.bind(56565, '0.0.0.0');
