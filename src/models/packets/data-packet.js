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
            const dataTrackerList = Decoders.Data.TrackerListChunk(subChunk.chunk_data);
            dataTrackerList.trackers?.forEach((tracker) => {
              if (tracker.data && tracker.data_len > 0) {
                const fields = new Parser()
                  .array('fields', {
                    type: Decoders.Data.TrackerFieldChunk,
                    lengthInBytes: tracker.data_len,
                  })
                  .parse(tracker.data);
                if (fields.fields) {
                  fields.fields.forEach((field) => {
                    switch (field.id) {
                      case 0x0000:
                        tracker.pos = field.data;
                        break;
                      case 0x0001:
                        tracker.speed = field.data;
                        break;
                      case 0x0002:
                        tracker.ori = field.data;
                        break;
                      case 0x0003:
                        tracker.status = field.data;
                        break;
                      case 0x0004:
                        tracker.accel = field.data;
                        break;
                      case 0x0005:
                        tracker.trgtpos = field.data;
                        break;
                      case 0x0006:
                        tracker.timestamp = field.data;
                        break;
                      default:
                        break;
                    }
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
