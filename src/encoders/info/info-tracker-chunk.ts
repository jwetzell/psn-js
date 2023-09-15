import chunk from '../chunk';

export default (trackerId: number, trackerNameChunk: Buffer): Buffer => chunk(trackerId, trackerNameChunk, true);
