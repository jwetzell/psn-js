const { Encoder, Tracker } = require('../dist/cjs');

const encoder = new Encoder('Server Name', 2, 3); // server name, version high, version low

const trackers = [];

const tracker = new Tracker(1, 'Tracker 1'); // id, name
tracker.setPos(1.0, 1.0, 1.0); // x, y, z

trackers.push(tracker);

const timestamp = 1;

// these two calls return an array of Buffers due to potential splitting that might take place because of max UDP packet size
const dataPackets = encoder.getDataPackets(timestamp, trackers);
const infoPackets = encoder.getInfoPackets(timestamp, trackers);

dataPackets.forEach((dataPacket) => {
  console.log('send packet somehow');
  console.log(dataPacket);
});

infoPackets.forEach((infoPacket) => {
  console.log('send packet somehow');
  console.log(infoPacket);
});
