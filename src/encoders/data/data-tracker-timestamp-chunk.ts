import chunk from '../chunk.js';

const buf = new DataView(new ArrayBuffer(8));
export default (timestamp: bigint): Uint8Array => {
  buf.setBigUint64(0, BigInt(timestamp), true);
  return chunk(0x0006, new Uint8Array(buf.buffer), false);
};
