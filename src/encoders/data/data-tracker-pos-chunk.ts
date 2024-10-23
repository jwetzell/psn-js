import chunk from '../chunk';

export default (x: number, y: number, z: number): Uint8Array => {
  const buf = new DataView(new ArrayBuffer(12));

  buf.setFloat32(0, x, true);
  buf.setFloat32(4, y, true);
  buf.setFloat32(8, z, true);

  return chunk(0x0000, new Uint8Array(buf.buffer), false);
};
