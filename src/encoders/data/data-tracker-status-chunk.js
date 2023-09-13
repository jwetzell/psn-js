const chunk = require('../chunk');

module.exports = (validity) => {
  const buf = Buffer.alloc(4);
  buf.writeFloatLE(validity);
  return chunk(0x0003, buf, false);
};
