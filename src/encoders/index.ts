import Chunk from './chunk.js';
import DataPacketChunk from './data/data-packet-chunk.js';
import DataTrackerAccelChunk from './data/data-tracker-accel-chunk.js';
import DataTrackerChunk from './data/data-tracker-chunk.js';
import DataTrackerListChunk from './data/data-tracker-list-chunk.js';
import DataTrackerOriChunk from './data/data-tracker-ori-chunk.js';
import DataTrackerPosChunk from './data/data-tracker-pos-chunk.js';
import DataTrackerSpeedChunk from './data/data-tracker-speed-chunk.js';
import DataTrackerStatusChunk from './data/data-tracker-status-chunk.js';
import DataTrackerTimestampChunk from './data/data-tracker-timestamp-chunk.js';
import DataTrackerTrgtposChunk from './data/data-tracker-trgtpos-chunk.js';
import PacketHeaderChunk from './packet-header-chunk.js';

import InfoPacketChunk from './info/info-packet-chunk.js';
import InfoSystemNameChunk from './info/info-system-name-chunk.js';
import InfoTrackerChunk from './info/info-tracker-chunk.js';
import InfoTrackerListChunk from './info/info-tracker-list-chunk.js';
import InfoTrackerNameChunk from './info/info-tracker-name-chunk.js';

export const Encoders = {
  DataPacketChunk,
  DataTrackerAccelChunk,
  DataTrackerChunk,
  DataTrackerListChunk,
  DataTrackerOriChunk,
  DataTrackerPosChunk,
  DataTrackerSpeedChunk,
  DataTrackerStatusChunk,
  DataTrackerTimestampChunk,
  DataTrackerTrgtposChunk,
  InfoPacketChunk,
  InfoSystemNameChunk,
  InfoTrackerChunk,
  InfoTrackerListChunk,
  InfoTrackerNameChunk,
  PacketHeaderChunk,
  Chunk,
};
