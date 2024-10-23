import chunk from '../chunk';

export default (validity: number): Uint8Array => {
  const buf = new DataView(new ArrayBuffer(4));
  buf.setFloat32(0, validity, true);
  return chunk(0x0003, new Uint8Array(buf.buffer), false);
};
