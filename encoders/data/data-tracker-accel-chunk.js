const chunk = require('../chunk');

module.exports = (x, y, z) => {
  const buf = Buffer.alloc(12);
  buf.writeFloatLE(x);
  buf.writeFloatLE(y, 4);
  buf.writeFloatLE(z, 8);
  return chunk(0x0004, buf, false);
};
