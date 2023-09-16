import Chunk from './chunk';
import Packet from './packet';
import PacketHeaderChunk from './packet-header-chunk';

import DataPacketChunk from './data/data-packet-chunk';
import DataTrackerChunk from './data/data-tracker-chunk';
import DataTrackerFieldChunk from './data/data-tracker-field-chunk';
import DataTrackerListChunk from './data/data-tracker-list-chunk';

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
  DataTrackerFieldChunk,
  DataTrackerListChunk,
  InfoPacketChunk,
  InfoSystemNameChunk,
  InfoTrackerChunk,
  InfoTrackerListChunk,
  InfoTrackerNameChunk,
};
