const { Decoder } = require('../dist/cjs');

const decoder = new Decoder();

const infoPacketBuffer = new Uint8Array([
  0x56, 0x67, 0x34, 0x80, 0x00, 0x00, 0x0c, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x03, 0x01,
  0x01, 0x01, 0x00, 0x0b, 0x00, 0x53, 0x65, 0x72, 0x76, 0x65, 0x72, 0x20, 0x4e, 0x61, 0x6d, 0x65, 0x02, 0x00, 0x11,
  0x80, 0x01, 0x00, 0x0d, 0x80, 0x00, 0x00, 0x09, 0x00, 0x54, 0x72, 0x61, 0x63, 0x6b, 0x65, 0x72, 0x20, 0x31,
]);
const dataPacketBuffer = new Uint8Array([
  0x55, 0x67, 0x28, 0x80, 0x00, 0x00, 0x0c, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0x03, 0x01,
  0x01, 0x01, 0x00, 0x14, 0x80, 0x01, 0x00, 0x10, 0x80, 0x00, 0x00, 0x0c, 0x00, 0x00, 0x00, 0x80, 0x3f, 0x00, 0x00,
  0x80, 0x3f, 0x00, 0x00, 0x80, 0x3f,
]);

decoder.decode(infoPacketBuffer);
decoder.decode(dataPacketBuffer);

// the system_name from info packets if available
console.log(decoder.systemName);

// map of trackers populated with any data that has been received
// this merges both info and data packet properties into one
console.log(decoder.trackers);
