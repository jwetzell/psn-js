import chunk from '../chunk.js';

const floatArray = new Float32Array(3);
export default (x: number, y: number, z: number): Uint8Array => {
  floatArray[0] = x;
  floatArray[1] = y;
  floatArray[2] = z;

  return chunk(0x0000, new Uint8Array(floatArray.buffer), false);
};
