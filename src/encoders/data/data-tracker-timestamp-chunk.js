const chunk = require('../chunk');

module.exports = (timestamp) => {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64LE(BigInt(timestamp));
  return chunk(0x0006, buf, false);
};
