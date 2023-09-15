import chunk from '../chunk';

export default (validity: number): Buffer => {
  const buf = Buffer.alloc(4);
  buf.writeFloatLE(validity);
  return chunk(0x0003, buf, false);
};
