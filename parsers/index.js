const { PSN_DATA_CHUNK_DATA_PARSER } = require('./data');
const { PSN_INFO_CHUNK_DATA_PARSER } = require('./info');

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
  .choice('chunk_data', {
    tag: 'id',
    choices: {
      0x6755: PSN_DATA_CHUNK_DATA_PARSER,
      0x6756: PSN_INFO_CHUNK_DATA_PARSER,
    },
  });

module.exports = (buffer) => PSN_PACKET_PARSER.parse(buffer);
