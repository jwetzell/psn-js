const chunk = require('../chunk');

module.exports = (timestamp) => {
  const buf = Buffer.alloc(8);
  const timestampHigh = timestamp.toString(2).padStart(64, '0').substring(0, 32);
  const timestampLow = timestamp.toString(2).padStart(64, '0').substring(32);
  buf.writeUInt32LE(parseInt(timestampLow, 2));
  buf.writeUInt32LE(parseInt(timestampHigh, 2), 4);
  return chunk(0x0006, buf, false);
};
