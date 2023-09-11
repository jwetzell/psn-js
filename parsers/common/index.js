const Parser = require('binary-parser').Parser;

const PSN_PACKET_HEADER_PARSER = new Parser()
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
  .uint64le('packet_timestamp')
  .uint8('version_high')
  .uint8('version_low')
  .uint8('frame_id')
  .uint8('frame_packet_count')
  .seek(4);

module.exports = {
  PSN_PACKET_HEADER_PARSER,
};
