import Chunk from './chunk';
import Packet from './packet';
import PacketHeaderChunk from './packet-header-chunk';

import DataPacketChunk from './data/data-packet-chunk';
import DataTrackerChunk from './data/data-tracker-chunk';
import DataTrackerListChunk from './data/data-tracker-list-chunk';
import DataTrackerStatusChunk from './data/data-tracker-status-chunk';
import DataTrackerTimestampChunk from './data/data-tracker-timestamp-chunk';
import DataTrackerXYZChunk from './data/data-tracker-xyz-chunk';

import InfoPacketChunk from './info/info-packet-chunk';
import InfoSystemNameChunk from './info/info-system-name-chunk';
import InfoTrackerChunk from './info/info-tracker-chunk';
import InfoTrackerListChunk from './info/info-tracker-list-chunk';
import InfoTrackerNameChunk from './info/info-tracker-name-chunk';

export const Decoders = {
  Chunk,
  PacketHeaderChunk,
  Packet,
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
