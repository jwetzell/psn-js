const Parser = require('binary-parser').Parser;

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

const InfoSystemNameParser = new Parser().string('system_name', { greedy: true });

const InfoTrackerListParser = new Parser().array('trackers', { type: PSN_INFO_TRACKER_PARSER, readUntil: 'eof' });

module.exports = {
  InfoSystemNameParser,
  InfoTrackerListParser,
};
