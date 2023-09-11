const { Parser } = require('binary-parser');
const { ChunkParser, HeaderParser } = require('../parsers/common');
const { InfoSystemNameParser, InfoTrackerListParser } = require('../parsers/info');

class InfoPacket {
  constructor(packet) {
    this.packet = packet;
    this.subChunks = [];
    if (this.packet.has_subchunks) {
      this.subChunkParser = new Parser().array('chunks', {
        type: ChunkParser,
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
              ...HeaderParser.parse(subChunk.chunk_data),
            };
            break;
          case 1:
            populatedSubChunk = {
              ...subChunk,
              ...InfoSystemNameParser.parse(subChunk.chunk_data),
            };
            break;
          case 2:
            populatedSubChunk = {
              ...subChunk,
              ...InfoTrackerListParser.parse(subChunk.chunk_data),
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
