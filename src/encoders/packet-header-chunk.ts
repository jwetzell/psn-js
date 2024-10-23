import chunk from './chunk';

export default (
  timestamp: bigint,
  versionHigh: number,
  versionLow: number,
  frameId: number,
  framePacketCount: number
): Uint8Array => {
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

  const packetHeader = new DataView(new ArrayBuffer(12));
  packetHeader.setBigUint64(0, BigInt(timestamp), true);
  packetHeader.setUint8(8, versionHigh);
  packetHeader.setUint8(9, versionLow);
  packetHeader.setUint8(10, frameId);
  packetHeader.setUint8(11, framePacketCount);

  return chunk(0x0000, new Uint8Array(packetHeader.buffer), false);
};
