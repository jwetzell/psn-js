import chunk from '../chunk';

export default (timestamp: bigint): Uint8Array => {
  const buf = new DataView(new ArrayBuffer(8));
  buf.setBigUint64(0, BigInt(timestamp), true);
  return chunk(0x0006, new Uint8Array(buf.buffer), false);
};
