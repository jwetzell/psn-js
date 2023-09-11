const { PSN_PACKET_HEADER_PARSER } = require('../common');
const Parser = require('binary-parser').Parser;

const PSN_DATA_TRACKER_FIELD_PARSER = new Parser()
  .uint16le('id')
  .uint16le('data_len', {
    formatter: (item) => {
      const binary = item.toString(2).padStart(16, '0');
      return Number.parseInt(binary.substring(1), 2);
    },
  })
  .seek(-2)
  .uint16le('has_subchunks', {
    formatter: (item) => {
      const binary = item.toString(2).padStart(16, '0');
      return binary.charAt(0) === '1';
    },
  })
  .choice('data', {
    tag: 'id',
    choices: {
      0x0000: new Parser().floatle('pos_x').floatle('pos_y').floatle('pos_z'),
      0x0001: new Parser().floatle('speed_x').floatle('speed_y').floatle('speed_z'),
      0x0002: new Parser().floatle('ori_x').floatle('ori_y').floatle('ori_z'),
      0x0003: new Parser().floatle('validity'),
      0x0004: new Parser().floatle('accel_x').floatle('accel_y').floatle('accel_z'),
      0x0005: new Parser().floatle('trgtpos_x').floatle('trgtpos_y').floatle('trgtpos_z'),
      0x0006: new Parser().uint64le('tracker_timestamp'),
    },
  });

const PSN_DATA_TRACKER_PARSER = new Parser()
  .uint16le('id')
  .uint16le('data_len', {
    formatter: (item) => {
      const binary = item.toString(2).padStart(16, '0');
      return Number.parseInt(binary.substring(1), 2);
    },
  })
  .seek(-2)
  .uint16le('has_subchunks', {
    formatter: (item) => {
      const binary = item.toString(2).padStart(16, '0');
      return binary.charAt(0) === '1';
    },
  })
  .buffer('data', {
    length: 'data_len',
  });

const PSN_DATA_TRACKER_LIST_PARSER = new Parser()
  .uint16le('id')
  .uint16le('data_len', {
    formatter: (item) => {
      const binary = item.toString(2).padStart(16, '0');
      return Number.parseInt(binary.substring(1), 2);
    },
  })
  .seek(-2)
  .uint16le('has_subchunks', {
    formatter: (item) => {
      const binary = item.toString(2).padStart(16, '0');
      return binary.charAt(0) === '1';
    },
  })
  .array('trackers', { type: PSN_DATA_TRACKER_PARSER, lengthInBytes: 'data_len' });

const PSN_DATA_CHUNK_DATA_PARSER = new Parser()
  .nest('packet_header', { type: PSN_PACKET_HEADER_PARSER })
  .nest('tracker_list', { type: PSN_DATA_TRACKER_LIST_PARSER });

module.exports = {
  PSN_DATA_CHUNK_DATA_PARSER,
  PSN_DATA_TRACKER_FIELD_PARSER,
  PSN_DATA_TRACKER_LIST_PARSER,
  PSN_DATA_TRACKER_PARSER,
};
