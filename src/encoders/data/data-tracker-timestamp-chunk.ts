import chunk from '../chunk';

export default (timestamp: bigint): Buffer => {
  const buf = Buffer.alloc(8);
  buf.writeBigUInt64LE(BigInt(timestamp));
  return chunk(0x0006, buf, false);
};
