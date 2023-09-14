const chunk = require('./chunk');

module.exports = (timestamp, versionHigh, versionLow, frameId, framePacketCount) => {
  if (frameId > 255) {
    throw new Error('frame id must be >= 0 and <= 255');
  }
  const packetHeader = Buffer.alloc(12);
  const timestampHigh = timestamp.toString(2).padStart(64, '0').substring(0, 32);
  const timestampLow = timestamp.toString(2).padStart(64, '0').substring(32);
  packetHeader.writeUInt32LE(parseInt(timestampLow, 2));
  packetHeader.writeUInt32LE(parseInt(timestampHigh, 2), 4);

  packetHeader.writeUint8(versionHigh, 8);
  packetHeader.writeUint8(versionLow, 9);
  packetHeader.writeUint8(frameId, 10);
  packetHeader.writeUint8(framePacketCount, 11);

  return chunk(0x0000, packetHeader, false);
};
