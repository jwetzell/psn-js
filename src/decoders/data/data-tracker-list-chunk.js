const Parser = require('binary-parser').Parser;

const dataTrackerParser = new Parser()
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

module.exports = new Parser().array('trackers', { type: dataTrackerParser, readUntil: 'eof' });
