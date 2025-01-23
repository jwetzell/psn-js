const { deepEqual, throws, equal } = require('assert');
const { describe, it } = require('node:test');
const { Encoders } = require('../dist/cjs/encoders');

const goodTests = [
  {
    description: 'DataTrackerPosChunk',
    expected: new Uint8Array([0, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
    bytes: Encoders.DataTrackerPosChunk(1.0, 2.0, 3.0),
  },
  {
    description: 'DataTrackerSpeedChunk',
    expected: new Uint8Array([1, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
    bytes: Encoders.DataTrackerSpeedChunk(1.0, 2.0, 3.0),
  },
  {
    description: 'DataTrackerOriChunk',
    expected: new Uint8Array([2, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
    bytes: Encoders.DataTrackerOriChunk(1.0, 2.0, 3.0),
  },
  {
    description: 'DataTrackerStatusChunk',
    expected: new Uint8Array([3, 0, 4, 0, 0, 0, 128, 63]),
    bytes: Encoders.DataTrackerStatusChunk(1.0),
  },
  {
    description: 'DataTrackerAccelChunk',
    expected: new Uint8Array([4, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
    bytes: Encoders.DataTrackerAccelChunk(1.0, 2.0, 3.0),
  },
  {
    description: 'DataTrackerTrgtposChunk',
    expected: new Uint8Array([5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
    bytes: Encoders.DataTrackerTrgtposChunk(1.0, 2.0, 3.0),
  },
  {
    description: 'DataTrackerTimestampChunk',
    expected: new Uint8Array([6, 0, 8, 0, 210, 2, 150, 73, 0, 0, 0, 0]),
    bytes: Encoders.DataTrackerTimestampChunk(1234567890n),
  },
  {
    description: 'DataTrackerChunk',
    expected: new Uint8Array([
      1, 0, 100, 128, 0, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 1, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0,
      0, 64, 64, 2, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 3, 0, 4, 0, 0, 0, 128, 63, 4, 0, 12, 0, 0, 0,
      128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 6, 0, 8, 0, 210, 2,
      150, 73, 0, 0, 0, 0,
    ]),
    bytes: Encoders.DataTrackerChunk(1, [
      new Uint8Array([0, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
      new Uint8Array([1, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
      new Uint8Array([2, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
      new Uint8Array([3, 0, 4, 0, 0, 0, 128, 63]),
      new Uint8Array([4, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
      new Uint8Array([5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
      new Uint8Array([6, 0, 8, 0, 210, 2, 150, 73, 0, 0, 0, 0]),
    ]),
  },
  {
    description: 'DataTrackerListChunk',
    expected: new Uint8Array([
      1, 0, 104, 128, 1, 0, 100, 128, 0, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 1, 0, 12, 0, 0, 0, 128, 63,
      0, 0, 0, 64, 0, 0, 64, 64, 2, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 3, 0, 4, 0, 0, 0, 128, 63, 4, 0,
      12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 6, 0, 8,
      0, 210, 2, 150, 73, 0, 0, 0, 0,
    ]),
    bytes: Encoders.DataTrackerListChunk([
      new Uint8Array([
        1, 0, 100, 128, 0, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 1, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64,
        0, 0, 64, 64, 2, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 3, 0, 4, 0, 0, 0, 128, 63, 4, 0, 12, 0, 0,
        0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 6, 0, 8, 0, 210,
        2, 150, 73, 0, 0, 0, 0,
      ]),
    ]),
  },
  {
    description: 'DataPacketChunk',
    expected: new Uint8Array([
      85, 103, 124, 128, 0, 0, 12, 0, 210, 2, 150, 73, 0, 0, 0, 0, 2, 3, 1, 123, 1, 0, 104, 128, 1, 0, 100, 128, 0, 0,
      12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 1, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 2, 0, 12,
      0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 3, 0, 4, 0, 0, 0, 128, 63, 4, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64,
      0, 0, 64, 64, 5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 6, 0, 8, 0, 210, 2, 150, 73, 0, 0, 0, 0,
    ]),
    bytes: Encoders.DataPacketChunk(
      new Uint8Array([0, 0, 12, 0, 210, 2, 150, 73, 0, 0, 0, 0, 2, 3, 1, 123]),
      new Uint8Array([
        1, 0, 104, 128, 1, 0, 100, 128, 0, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 1, 0, 12, 0, 0, 0, 128,
        63, 0, 0, 0, 64, 0, 0, 64, 64, 2, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 3, 0, 4, 0, 0, 0, 128, 63,
        4, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 6,
        0, 8, 0, 210, 2, 150, 73, 0, 0, 0, 0,
      ])
    ),
  },
  {
    description: 'InfoTrackerNameChunk',
    expected: new Uint8Array([0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49]),
    bytes: Encoders.InfoTrackerNameChunk('Tracker 1'),
  },
  {
    description: 'InfoSystemNameChunk',
    expected: new Uint8Array([1, 0, 10, 0, 80, 83, 78, 32, 83, 101, 114, 118, 101, 114]),
    bytes: Encoders.InfoSystemNameChunk('PSN Server'),
  },
  {
    description: 'InfoTrackerChunk',
    expected: new Uint8Array([1, 0, 13, 128, 0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49]),
    bytes: Encoders.InfoTrackerChunk(1, new Uint8Array([0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49])),
  },
  {
    description: 'InfoTrackerListChunk',
    expected: new Uint8Array([2, 0, 17, 128, 1, 0, 13, 128, 0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49]),
    bytes: Encoders.InfoTrackerListChunk([
      new Uint8Array([1, 0, 13, 128, 0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49]),
    ]),
  },
  {
    description: 'PacketHeaderChunk',
    expected: new Uint8Array([0, 0, 12, 0, 210, 2, 150, 73, 0, 0, 0, 0, 2, 3, 1, 123]),
    bytes: Encoders.PacketHeaderChunk(1234567890n, 2, 3, 1, 123),
  },
  {
    description: 'InfoPacketChunk',
    expected: new Uint8Array([
      86, 103, 51, 128, 0, 0, 12, 0, 210, 2, 150, 73, 0, 0, 0, 0, 2, 3, 1, 123, 1, 0, 10, 0, 80, 83, 78, 32, 83, 101,
      114, 118, 101, 114, 2, 0, 17, 128, 1, 0, 13, 128, 0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49,
    ]),
    bytes: Encoders.InfoPacketChunk(
      new Uint8Array([0, 0, 12, 0, 210, 2, 150, 73, 0, 0, 0, 0, 2, 3, 1, 123]),
      new Uint8Array([1, 0, 10, 0, 80, 83, 78, 32, 83, 101, 114, 118, 101, 114]),
      new Uint8Array([2, 0, 17, 128, 1, 0, 13, 128, 0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49])
    ),
  },
];

describe('PSN Message Encoding', () => {
  goodTests.forEach((messageTest) => {
    it(messageTest.description, () => {
      deepEqual(messageTest.bytes, messageTest.expected);
    });
  });
});

//TODO(jwetzell): add tests that handle errors
const badTests = [];

describe('PSN Message Encoding Throws', () => {
  badTests.forEach((messageTest) => {
    it(messageTest.description, () => {
      throws(() => {}, messageTest.throwsMessage);
    });
  });
});
