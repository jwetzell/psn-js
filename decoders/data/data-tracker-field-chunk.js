const Parser = require('binary-parser').Parser;

module.exports = new Parser()
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
