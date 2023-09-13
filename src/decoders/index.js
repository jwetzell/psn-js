const Chunk = require('./chunk');
const PacketHeaderChunk = require('./packet-header-chunk');
const Packet = require('./packet');
const Info = require('./info');
const Data = require('./data');

module.exports = {
  Chunk,
  PacketHeaderChunk,
  Packet,
  Info: {
    ...Info,
  },
  Data: {
    ...Data,
  },
};
