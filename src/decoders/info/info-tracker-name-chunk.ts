import { Decoders } from '..';
import { InfoTrackerNameChunk } from '../../models/info/info-tracker-name-chunk';

function decodeTrackerNameChunk(trackerNameChunk: InfoTrackerNameChunk) {
  if (trackerNameChunk.chunk_data !== undefined && trackerNameChunk.data_len !== undefined) {
    trackerNameChunk.tracker_name = trackerNameChunk.chunk_data.subarray(0, trackerNameChunk.data_len).toString();
  }
}
export default (buffer: Buffer): InfoTrackerNameChunk =>
  Decoders.Chunk(buffer, decodeTrackerNameChunk) as InfoTrackerNameChunk;
