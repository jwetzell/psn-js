const chunk = require('../chunk');

module.exports = (packetHeaderChunk, trackerListChunk) =>
  chunk(0x6755, Buffer.concat([packetHeaderChunk, trackerListChunk]), true);
