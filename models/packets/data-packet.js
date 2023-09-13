/* eslint-disable no-case-declarations */
/* eslint-disable no-param-reassign */
const { Parser } = require('binary-parser');
const Decoders = require('../../decoders');

class DataPacket {
  constructor(packet) {
    this.packet = packet;
    this.subChunks = [];
    // console.log(this.packet);
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
            const dataTrackerList = Decoders.Data.TrackerListChunk.parse(subChunk.chunk_data);
            dataTrackerList.trackers?.forEach((tracker) => {
              if (tracker.data && tracker.data_len > 0) {
                const fields = new Parser()
                  .array('fields', {
                    type: Decoders.Data.TrackerFieldChunk,
                    lengthInBytes: tracker.data_len,
                  })
                  .parse(tracker.data);
                if (fields.fields) {
                  tracker.fields = [];
                  fields.fields.forEach((field) => {
                    tracker.fields.push(field.data);
                  });
                }
              }
            });
            populatedSubChunk = {
              ...subChunk,
              ...dataTrackerList,
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

module.exports = DataPacket;
