import chunk from '../chunk.js';

export default (trackerId: number, trackerNameChunk: Uint8Array): Uint8Array =>
  chunk(trackerId, trackerNameChunk, true);
