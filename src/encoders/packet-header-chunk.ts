import chunk from './chunk';

export default (
  timestamp: bigint,
  versionHigh: number,
  versionLow: number,
  frameId: number,
  framePacketCount: number
): Buffer => {
  if (frameId > 255) {
    throw new Error('frame id must be >= 0 and <= 255');
  }
  const packetHeader = Buffer.alloc(12);
  packetHeader.writeBigUInt64LE(BigInt(timestamp));
  packetHeader.writeUint8(versionHigh, 8);
  packetHeader.writeUint8(versionLow, 9);
  packetHeader.writeUint8(frameId, 10);
  packetHeader.writeUint8(framePacketCount, 11);

  return chunk(0x0000, packetHeader, false);
};
