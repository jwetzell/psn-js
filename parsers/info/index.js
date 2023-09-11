const { PSN_PACKET_HEADER_PARSER } = require('../common');

const Parser = require('binary-parser').Parser;

const PSN_INFO_SYSTEM_NAME_PARSER = new Parser()
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
  .string('system_name', { length: 'data_len' });

const PSN_INFO_TRACKER_NAME_PARSER = new Parser()
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
  .string('tracker_name', { length: 'data_len' });

const PSN_INFO_TRACKER_PARSER = new Parser()
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
  .nest('tracker_name', {
    type: PSN_INFO_TRACKER_NAME_PARSER,
  });

const PSN_INFO_TRACKER_LIST_PARSER = new Parser()
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
  .array('trackers', { type: PSN_INFO_TRACKER_PARSER, lengthInBytes: 'data_len' });

const PSN_INFO_CHUNK_DATA_PARSER = new Parser()
  .nest('packet_header', { type: PSN_PACKET_HEADER_PARSER })
  .nest('system_name', { type: PSN_INFO_SYSTEM_NAME_PARSER })
  .nest('tracker_list', { type: PSN_INFO_TRACKER_LIST_PARSER });

module.exports = {
  PSN_INFO_SYSTEM_NAME_PARSER,
  PSN_INFO_TRACKER_NAME_PARSER,
  PSN_INFO_TRACKER_PARSER,
  PSN_INFO_TRACKER_LIST_PARSER,
  PSN_INFO_CHUNK_DATA_PARSER,
};
