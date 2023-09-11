/* eslint-disable no-param-reassign */
const { Parser } = require('binary-parser');
const psnParser = require('./parsers/index.js');
const { PSN_DATA_TRACKER_FIELD_PARSER } = require('./parsers/data/index.js');

const DATA_PACKET = 0x6755;
const INFO_PACKET = 0x6756;

class Decoder {
  constructor() {
    this.info = {};

    this.data = {
      trackers: {},
    };
  }

  // TODO(jwetzell): support multiple frame packets this might require some rework of how chunks are assumed
  decode(packetBuf) {
    const packet = psnParser(packetBuf);
    if (packet.id === INFO_PACKET) {
      if (packet.chunk_data?.tracker_list?.trackers) {
        packet.chunk_data?.tracker_list?.trackers.forEach((tracker) => {
          if (this.data.trackers[tracker.id] === undefined) {
            this.data.trackers[tracker.id] = {};
          }
          this.data.trackers[tracker.id] = {
            ...this.data.trackers[tracker.id],
            id: tracker.id,
            name: tracker.tracker_name.tracker_name,
          };
        });
      }
    } else if (packet.id === DATA_PACKET) {
      if (packet.chunk_data?.tracker_list?.trackers) {
        packet.chunk_data?.tracker_list?.trackers.forEach((tracker) => {
          if (this.data.trackers[tracker.id] === undefined) {
            this.data.trackers[tracker.id] = {};
          }
          this.data.trackers[tracker.id] = {
            ...this.data.trackers[tracker.id],
            id: tracker.id,
          };

          if (tracker.data && tracker.data_len > 0) {
            const fields = new Parser()
              .array('fields', {
                type: PSN_DATA_TRACKER_FIELD_PARSER,
                lengthInBytes: tracker.data_len,
              })
              .parse(tracker.data);
            if (fields.fields) {
              fields.fields.forEach((field) => {
                if (field.data) {
                  this.data.trackers[tracker.id] = {
                    ...this.data.trackers[tracker.id],
                    ...field.data,
                  };
                }
              });
            }
            tracker.fields = fields.fields;
            delete tracker.data;
          }
        });
      }
    }
    return packet;
  }
}

module.exports = {
  Decoder,
};
