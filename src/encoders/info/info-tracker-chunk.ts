import chunk from '../chunk';

export default (trackerId: number, trackerNameChunk: Uint8Array): Uint8Array =>
  chunk(trackerId, trackerNameChunk, true);
