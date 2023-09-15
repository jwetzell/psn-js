const { CHUNK_HEADER_SIZE } = require('../../constants');
const chunk = require('../chunk');
const packetHeaderChunk = require('../packet-header-chunk');
const infoSystemNameChunk = require('./info-system-name-chunk');
const infoTrackerListChunk = require('./info-tracker-list-chunk');

function decodeInfoPacketChunk(infoPacketChunk) {
  if (infoPacketChunk.has_subchunks && infoPacketChunk.chunk_data) {
    let offset = 0;
    while (offset < infoPacketChunk.data_len) {
      const chunkId = infoPacketChunk.chunk_data.readUInt16LE(offset);
      switch (chunkId) {
        case 0x0000:
          infoPacketChunk.packet_header = packetHeaderChunk(infoPacketChunk.chunk_data.subarray(offset));
          offset += CHUNK_HEADER_SIZE;
          offset += infoPacketChunk.packet_header.data_len;
          break;
        case 0x0001:
          infoPacketChunk.system_name = infoSystemNameChunk(infoPacketChunk.chunk_data.subarray(offset));
          offset += CHUNK_HEADER_SIZE;
          offset += infoPacketChunk.system_name.data_len;
          break;
        case 0x0002:
          infoPacketChunk.tracker_list = infoTrackerListChunk(infoPacketChunk.chunk_data.subarray(offset));
          offset += CHUNK_HEADER_SIZE;
          offset += infoPacketChunk.tracker_list.data_len;
          break;
        default:
          break;
      }
    }
  }
}

module.exports = (buffer) => chunk(buffer, decodeInfoPacketChunk);
