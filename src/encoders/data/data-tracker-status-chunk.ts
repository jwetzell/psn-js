import chunk from '../chunk.js';

const floatArray = new Float32Array(1);
export default (validity: number): Uint8Array => {
  floatArray[0] = validity;
  return chunk(0x0003, new Uint8Array(floatArray.buffer), false);
};
