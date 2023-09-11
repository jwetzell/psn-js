const Parser = require('binary-parser').Parser;

const PSN_PACKET_PARSER = new Parser()
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
  .buffer('chunk_data', { readUntil: 'eof' });

module.exports = (buffer) => PSN_PACKET_PARSER.parse(buffer);
