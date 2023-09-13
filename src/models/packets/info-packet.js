const { Parser } = require('binary-parser');
const Decoders = require('../../decoders');

class InfoPacket {
  constructor(packet) {
    this.packet = packet;
    this.subChunks = [];
    if (this.packet.has_subchunks) {
      this.subChunkParser = new Parser().array('chunks', {
        type: Decoders.Chunk,
        lengthInBytes: this.packet.data_len,
      });
      this.subChunks = this.subChunkParser.parse(this.packet.chunk_data)?.chunks;
      this.subChunks = this.subChunks.map((subChunk) => {
        let populatedSubChunk = {};
        populatedSubChunk.data_len_valid = subChunk.chunk_data.length === subChunk.data_len;
        switch (subChunk.id) {
          case 0:
            populatedSubChunk = {
              ...subChunk,
              ...Decoders.PacketHeaderChunk.parse(subChunk.chunk_data),
            };
            break;
          case 1:
            populatedSubChunk = {
              ...subChunk,
              ...Decoders.Info.SystemNameChunk.parse(subChunk.chunk_data),
            };
            break;
          case 2:
            populatedSubChunk = {
              ...subChunk,
              ...Decoders.Info.TrackerListChunk.parse(subChunk.chunk_data),
            };
            break;
          default:
            populatedSubChunk = {
              ...subChunk,
            };
            break;
        }
        return populatedSubChunk;
      });
    }
  }

  getHeaderPacket() {
    return this.subChunks.find((subChunk) => subChunk.id === 0x0000);
  }

  getSystemPacket() {
    return this.subChunks.find((subChunk) => subChunk.id === 0x0001);
  }
}

module.exports = InfoPacket;
