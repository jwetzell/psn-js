import chunk from '../chunk';

export default (trackerId: number, fieldChunks: Buffer[]): Buffer =>
  chunk(trackerId, Buffer.concat(fieldChunks), fieldChunks.length > 0);
