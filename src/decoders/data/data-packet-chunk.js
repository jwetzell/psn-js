const { CHUNK_HEADER_SIZE } = require('../../constants');
const chunk = require('../chunk');
const packetHeaderChunk = require('../packet-header-chunk');
const dataTrackerListChunk = require('./data-tracker-list-chunk');

function decodeDataPacketChunk(dataPacketChunk) {
  if (dataPacketChunk.has_subchunks && dataPacketChunk.chunk_data) {
    let offset = 0;
    while (offset < dataPacketChunk.data_len) {
      const chunkId = dataPacketChunk.chunk_data.readUInt16LE(offset);
      switch (chunkId) {
        case 0x0000:
          dataPacketChunk.packet_header = packetHeaderChunk(dataPacketChunk.chunk_data.subarray(offset));
          offset += CHUNK_HEADER_SIZE;
          offset += dataPacketChunk.packet_header.data_len;
          break;
        case 0x0001:
          dataPacketChunk.tracker_list = dataTrackerListChunk(dataPacketChunk.chunk_data.subarray(offset));
          offset += CHUNK_HEADER_SIZE;
          offset += dataPacketChunk.tracker_list.data_len;
          break;
        default:
          break;
      }
    }
  }
}

module.exports = (buffer) => chunk(buffer, decodeDataPacketChunk);
