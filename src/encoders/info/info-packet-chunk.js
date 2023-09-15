const chunk = require('../chunk');

module.exports = (packetHeaderChunk, systemNameChunk, trackerListChunk) =>
  chunk(0x6756, Buffer.concat([packetHeaderChunk, systemNameChunk, trackerListChunk]), true);
