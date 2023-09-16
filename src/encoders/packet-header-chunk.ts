import chunk from './chunk';

export default (
  timestamp: bigint,
  versionHigh: number,
  versionLow: number,
  frameId: number,
  framePacketCount: number
): Buffer => {
  if (!Number.isInteger(versionHigh)) {
    throw new Error('version high must be an integer');
  }
  if (!Number.isInteger(versionLow)) {
    throw new Error('version low must be an integer');
  }
  if (!Number.isInteger(frameId)) {
    throw new Error('frame id must be an integer');
  }
  if (!Number.isInteger(framePacketCount)) {
    throw new Error('frame packet count must be an integer');
  }

  if (versionHigh > 255 || versionHigh < 0) {
    throw new Error('version high must be >= 0 and <= 255');
  }
  if (versionLow > 255 || versionLow < 0) {
    throw new Error('version low must be >= 0 and <= 255');
  }
  if (frameId > 255 || frameId < 0) {
    throw new Error('frame id must be >= 0 and <= 255');
  }
  if (framePacketCount > 255 || framePacketCount < 0) {
    throw new Error('frame packet count must be >= 0 and <= 255');
  }

  const packetHeader = Buffer.alloc(12);
  packetHeader.writeBigUInt64LE(BigInt(timestamp));
  packetHeader.writeUint8(versionHigh, 8);
  packetHeader.writeUint8(versionLow, 9);
  packetHeader.writeUint8(frameId, 10);
  packetHeader.writeUint8(framePacketCount, 11);

  return chunk(0x0000, packetHeader, false);
};
