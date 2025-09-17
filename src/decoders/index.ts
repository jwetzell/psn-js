import Chunk from './chunk.js';
import PacketHeaderChunk from './packet-header-chunk.js';

import DataPacketChunk from './data/data-packet-chunk.js';
import DataTrackerChunk from './data/data-tracker-chunk.js';
import DataTrackerListChunk from './data/data-tracker-list-chunk.js';
import DataTrackerStatusChunk from './data/data-tracker-status-chunk.js';
import DataTrackerTimestampChunk from './data/data-tracker-timestamp-chunk.js';
import DataTrackerXYZChunk from './data/data-tracker-xyz-chunk.js';

import InfoPacketChunk from './info/info-packet-chunk.js';
import InfoSystemNameChunk from './info/info-system-name-chunk.js';
import InfoTrackerChunk from './info/info-tracker-chunk.js';
import InfoTrackerListChunk from './info/info-tracker-list-chunk.js';
import InfoTrackerNameChunk from './info/info-tracker-name-chunk.js';

export const Decoders = {
  Chunk,
  PacketHeaderChunk,
  DataPacketChunk,
  DataTrackerChunk,
  DataTrackerXYZChunk,
  DataTrackerStatusChunk,
  DataTrackerTimestampChunk,
  DataTrackerListChunk,
  InfoPacketChunk,
  InfoSystemNameChunk,
  InfoTrackerChunk,
  InfoTrackerListChunk,
  InfoTrackerNameChunk,
};
