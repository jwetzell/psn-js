import Chunk from './chunk';
import DataPacketChunk from './data/data-packet-chunk';
import DataTrackerAccelChunk from './data/data-tracker-accel-chunk';
import DataTrackerChunk from './data/data-tracker-chunk';
import DataTrackerListChunk from './data/data-tracker-list-chunk';
import DataTrackerOriChunk from './data/data-tracker-ori-chunk';
import DataTrackerPosChunk from './data/data-tracker-pos-chunk';
import DataTrackerSpeedChunk from './data/data-tracker-speed-chunk';
import DataTrackerStatusChunk from './data/data-tracker-status-chunk';
import DataTrackerTimestampChunk from './data/data-tracker-timestamp-chunk';
import DataTrackerTrgtposChunk from './data/data-tracker-trgtpos-chunk';
import PacketHeaderChunk from './packet-header-chunk';

import InfoPacketChunk from './info/info-packet-chunk';
import InfoSystemNameChunk from './info/info-system-name-chunk';
import InfoTrackerChunk from './info/info-tracker-chunk';
import InfoTrackerListChunk from './info/info-tracker-list-chunk';
import InfoTrackerNameChunk from './info/info-tracker-name-chunk';

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
