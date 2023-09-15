import chunk, { Chunk } from '../chunk';
export interface InfoTrackerNameChunk extends Chunk {
  tracker_name: string;
}

function decodeTrackerNameChunk(trackerNameChunk: InfoTrackerNameChunk) {
  if (trackerNameChunk.chunk_data !== undefined && trackerNameChunk.data_len !== undefined) {
    trackerNameChunk.tracker_name = trackerNameChunk.chunk_data.subarray(0, trackerNameChunk.data_len).toString();
  }
}
export default (buffer: Buffer): InfoTrackerNameChunk => chunk(buffer, decodeTrackerNameChunk) as InfoTrackerNameChunk;
