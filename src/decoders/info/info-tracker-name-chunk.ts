import { Decoders } from '..';
import { InfoTrackerNameChunk } from '../../models/info/info-tracker-name-chunk';

function decodeTrackerNameChunk(trackerNameChunk: InfoTrackerNameChunk) {
  if (trackerNameChunk.chunk_data !== undefined && trackerNameChunk.data_len !== undefined) {
    trackerNameChunk.tracker_name = new TextDecoder().decode(
      trackerNameChunk.chunk_data.slice(0, trackerNameChunk.data_len)
    );
  }
}
export default (buffer: Uint8Array): InfoTrackerNameChunk =>
  Decoders.Chunk(buffer, decodeTrackerNameChunk) as InfoTrackerNameChunk;
