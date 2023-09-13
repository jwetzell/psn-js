const Parser = require('binary-parser').Parser;

module.exports = new Parser()
  .uint64le('packet_timestamp')
  .uint8('version_high')
  .uint8('version_low')
  .uint8('frame_id')
  .uint8('frame_packet_count')
  .seek(4);
