const dataPacketChunk = require('./data/data-packet-chunk');
const infoPacketChunk = require('./info/info-packet-chunk');

module.exports = (buffer) => {
  const chunkId = buffer.readUInt16LE();
  switch (chunkId) {
    case 0x6756:
      return infoPacketChunk(buffer);
    case 0x6755:
      return dataPacketChunk(buffer);
    default:
      return {};
  }
};
