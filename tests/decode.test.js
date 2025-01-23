const { deepEqual, throws } = require('assert');
const { describe, it } = require('node:test');
const { Decoders } = require('../dist/cjs/decoders');

const goodTests = [
  {
    description: 'DataTrackerPosChunk',
    bytes: new Uint8Array([0, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
    expected: {
      chunk: {
        chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
        header: { dataLen: 12, id: 0, hasSubchunks: false },
      },
      data: {
        x: 1.0,
        y: 2.0,
        z: 3.0,
      },
    },
    decoder: Decoders.DataTrackerXYZChunk,
  },
  {
    description: 'DataTrackerSpeedChunk',
    bytes: new Uint8Array([1, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
    expected: {
      chunk: {
        chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
        header: { dataLen: 12, id: 1, hasSubchunks: false },
      },
      data: {
        x: 1.0,
        y: 2.0,
        z: 3.0,
      },
    },
    decoder: Decoders.DataTrackerXYZChunk,
  },
  {
    description: 'DataTrackerOriChunk',
    bytes: new Uint8Array([2, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
    expected: {
      chunk: {
        chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
        header: { dataLen: 12, id: 2, hasSubchunks: false },
      },
      data: {
        x: 1.0,
        y: 2.0,
        z: 3.0,
      },
    },
    decoder: Decoders.DataTrackerXYZChunk,
  },
  {
    description: 'DataTrackerStatusChunk',
    bytes: new Uint8Array([3, 0, 4, 0, 0, 0, 128, 63]),
    expected: {
      chunk: {
        chunkData: new Uint8Array([0, 0, 128, 63]),
        header: { dataLen: 4, id: 3, hasSubchunks: false },
      },
      data: {
        validity: 1.0,
      },
    },
    decoder: Decoders.DataTrackerStatusChunk,
  },
  {
    description: 'DataTrackerAccelChunk',
    bytes: new Uint8Array([4, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
    expected: {
      chunk: {
        chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
        header: { dataLen: 12, id: 4, hasSubchunks: false },
      },
      data: {
        x: 1.0,
        y: 2.0,
        z: 3.0,
      },
    },
    decoder: Decoders.DataTrackerXYZChunk,
  },
  {
    description: 'DataTrackerTrgtPosChunk',
    bytes: new Uint8Array([5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
    expected: {
      chunk: {
        chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
        header: { dataLen: 12, id: 5, hasSubchunks: false },
      },
      data: {
        x: 1.0,
        y: 2.0,
        z: 3.0,
      },
    },
    decoder: Decoders.DataTrackerXYZChunk,
  },
  {
    description: 'DataTrackerTimestampChunk',
    bytes: new Uint8Array([6, 0, 8, 0, 210, 2, 150, 73, 0, 0, 0, 0]),
    expected: {
      chunk: {
        chunkData: new Uint8Array([210, 2, 150, 73, 0, 0, 0, 0]),
        header: { dataLen: 8, id: 6, hasSubchunks: false },
      },
      data: {
        timestamp: 1234567890n,
      },
    },
    decoder: Decoders.DataTrackerTimestampChunk,
  },
  {
    description: 'DataTrackerChunk',
    bytes: new Uint8Array([
      1, 0, 100, 128, 0, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 1, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0,
      0, 64, 64, 2, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 3, 0, 4, 0, 0, 0, 128, 63, 4, 0, 12, 0, 0, 0,
      128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 6, 0, 8, 0, 210, 2,
      150, 73, 0, 0, 0, 0,
    ]),
    expected: {
      chunk: {
        chunkData: new Uint8Array([
          0, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 1, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64,
          2, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 3, 0, 4, 0, 0, 0, 128, 63, 4, 0, 12, 0, 0, 0, 128, 63,
          0, 0, 0, 64, 0, 0, 64, 64, 5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 6, 0, 8, 0, 210, 2, 150, 73,
          0, 0, 0, 0,
        ]),
        header: { dataLen: 100, id: 1, hasSubchunks: true },
      },
      data: {
        pos: {
          chunk: {
            chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
            header: { dataLen: 12, id: 0, hasSubchunks: false },
          },
          data: {
            x: 1.0,
            y: 2.0,
            z: 3.0,
          },
        },
        speed: {
          chunk: {
            chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
            header: { dataLen: 12, id: 1, hasSubchunks: false },
          },
          data: {
            x: 1.0,
            y: 2.0,
            z: 3.0,
          },
        },
        ori: {
          chunk: {
            chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
            header: { dataLen: 12, id: 2, hasSubchunks: false },
          },
          data: {
            x: 1.0,
            y: 2.0,
            z: 3.0,
          },
        },
        status: {
          chunk: {
            chunkData: new Uint8Array([0, 0, 128, 63]),
            header: { dataLen: 4, id: 3, hasSubchunks: false },
          },
          data: {
            validity: 1.0,
          },
        },
        accel: {
          chunk: {
            chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
            header: { dataLen: 12, id: 4, hasSubchunks: false },
          },
          data: {
            x: 1.0,
            y: 2.0,
            z: 3.0,
          },
        },
        trgtpos: {
          chunk: {
            chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
            header: { dataLen: 12, id: 5, hasSubchunks: false },
          },
          data: {
            x: 1.0,
            y: 2.0,
            z: 3.0,
          },
        },
        timestamp: {
          chunk: {
            chunkData: new Uint8Array([210, 2, 150, 73, 0, 0, 0, 0]),
            header: { dataLen: 8, id: 6, hasSubchunks: false },
          },
          data: {
            timestamp: 1234567890n,
          },
        },
      },
    },
    decoder: Decoders.DataTrackerChunk,
  },
  {
    description: 'DataTrackerListChunk',
    bytes: new Uint8Array([
      1, 0, 104, 128, 1, 0, 100, 128, 0, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 1, 0, 12, 0, 0, 0, 128, 63,
      0, 0, 0, 64, 0, 0, 64, 64, 2, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 3, 0, 4, 0, 0, 0, 128, 63, 4, 0,
      12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 6, 0, 8,
      0, 210, 2, 150, 73, 0, 0, 0, 0,
    ]),
    expected: {
      chunk: {
        chunkData: new Uint8Array([
          1, 0, 100, 128, 0, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 1, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0,
          64, 0, 0, 64, 64, 2, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 3, 0, 4, 0, 0, 0, 128, 63, 4, 0, 12,
          0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 6, 0, 8,
          0, 210, 2, 150, 73, 0, 0, 0, 0,
        ]),
        header: { dataLen: 104, id: 1, hasSubchunks: true },
      },
      data: {
        trackers: [
          {
            chunk: {
              chunkData: new Uint8Array([
                0, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 1, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0,
                64, 64, 2, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 3, 0, 4, 0, 0, 0, 128, 63, 4, 0, 12, 0,
                0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 6, 0,
                8, 0, 210, 2, 150, 73, 0, 0, 0, 0,
              ]),
              header: { dataLen: 100, id: 1, hasSubchunks: true },
            },
            data: {
              pos: {
                chunk: {
                  chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
                  header: { dataLen: 12, id: 0, hasSubchunks: false },
                },
                data: {
                  x: 1.0,
                  y: 2.0,
                  z: 3.0,
                },
              },
              speed: {
                chunk: {
                  chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
                  header: { dataLen: 12, id: 1, hasSubchunks: false },
                },
                data: {
                  x: 1.0,
                  y: 2.0,
                  z: 3.0,
                },
              },
              ori: {
                chunk: {
                  chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
                  header: { dataLen: 12, id: 2, hasSubchunks: false },
                },
                data: {
                  x: 1.0,
                  y: 2.0,
                  z: 3.0,
                },
              },
              status: {
                chunk: {
                  chunkData: new Uint8Array([0, 0, 128, 63]),
                  header: { dataLen: 4, id: 3, hasSubchunks: false },
                },
                data: {
                  validity: 1.0,
                },
              },
              accel: {
                chunk: {
                  chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
                  header: { dataLen: 12, id: 4, hasSubchunks: false },
                },
                data: {
                  x: 1.0,
                  y: 2.0,
                  z: 3.0,
                },
              },
              trgtpos: {
                chunk: {
                  chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
                  header: { dataLen: 12, id: 5, hasSubchunks: false },
                },
                data: {
                  x: 1.0,
                  y: 2.0,
                  z: 3.0,
                },
              },
              timestamp: {
                chunk: {
                  chunkData: new Uint8Array([210, 2, 150, 73, 0, 0, 0, 0]),
                  header: { dataLen: 8, id: 6, hasSubchunks: false },
                },
                data: {
                  timestamp: 1234567890n,
                },
              },
            },
          },
        ],
      },
    },
    decoder: Decoders.DataTrackerListChunk,
  },
  {
    description: 'DataPacketChunk',
    bytes: new Uint8Array([
      85, 103, 124, 128, 0, 0, 12, 0, 210, 2, 150, 73, 0, 0, 0, 0, 2, 3, 1, 123, 1, 0, 104, 128, 1, 0, 100, 128, 0, 0,
      12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 1, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 2, 0, 12,
      0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 3, 0, 4, 0, 0, 0, 128, 63, 4, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64,
      0, 0, 64, 64, 5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 6, 0, 8, 0, 210, 2, 150, 73, 0, 0, 0, 0,
    ]),
    expected: {
      chunk: {
        chunkData: new Uint8Array([
          0, 0, 12, 0, 210, 2, 150, 73, 0, 0, 0, 0, 2, 3, 1, 123, 1, 0, 104, 128, 1, 0, 100, 128, 0, 0, 12, 0, 0, 0,
          128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 1, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 2, 0, 12, 0, 0, 0,
          128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 3, 0, 4, 0, 0, 0, 128, 63, 4, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0,
          64, 64, 5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 6, 0, 8, 0, 210, 2, 150, 73, 0, 0, 0, 0,
        ]),
        header: { dataLen: 124, id: 26453, hasSubchunks: true },
      },
      data: {
        packetHeader: {
          chunk: {
            chunkData: new Uint8Array([210, 2, 150, 73, 0, 0, 0, 0, 2, 3, 1, 123]),
            header: { dataLen: 12, id: 0, hasSubchunks: false },
          },
          data: {
            packetTimestamp: 1234567890n,
            versionHigh: 2,
            versionLow: 3,
            frameId: 1,
            framePacketCount: 123,
          },
        },
        trackerList: {
          chunk: {
            chunkData: new Uint8Array([
              1, 0, 100, 128, 0, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 1, 0, 12, 0, 0, 0, 128, 63, 0, 0,
              0, 64, 0, 0, 64, 64, 2, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 3, 0, 4, 0, 0, 0, 128, 63, 4,
              0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64,
              6, 0, 8, 0, 210, 2, 150, 73, 0, 0, 0, 0,
            ]),
            header: { dataLen: 104, id: 1, hasSubchunks: true },
          },
          data: {
            trackers: [
              {
                chunk: {
                  chunkData: new Uint8Array([
                    0, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 1, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0,
                    0, 64, 64, 2, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 3, 0, 4, 0, 0, 0, 128, 63, 4, 0,
                    12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64, 5, 0, 12, 0, 0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64,
                    64, 6, 0, 8, 0, 210, 2, 150, 73, 0, 0, 0, 0,
                  ]),
                  header: { dataLen: 100, id: 1, hasSubchunks: true },
                },
                data: {
                  pos: {
                    chunk: {
                      chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
                      header: { dataLen: 12, id: 0, hasSubchunks: false },
                    },
                    data: {
                      x: 1.0,
                      y: 2.0,
                      z: 3.0,
                    },
                  },
                  speed: {
                    chunk: {
                      chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
                      header: { dataLen: 12, id: 1, hasSubchunks: false },
                    },
                    data: {
                      x: 1.0,
                      y: 2.0,
                      z: 3.0,
                    },
                  },
                  ori: {
                    chunk: {
                      chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
                      header: { dataLen: 12, id: 2, hasSubchunks: false },
                    },
                    data: {
                      x: 1.0,
                      y: 2.0,
                      z: 3.0,
                    },
                  },
                  status: {
                    chunk: {
                      chunkData: new Uint8Array([0, 0, 128, 63]),
                      header: { dataLen: 4, id: 3, hasSubchunks: false },
                    },
                    data: {
                      validity: 1.0,
                    },
                  },
                  accel: {
                    chunk: {
                      chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
                      header: { dataLen: 12, id: 4, hasSubchunks: false },
                    },
                    data: {
                      x: 1.0,
                      y: 2.0,
                      z: 3.0,
                    },
                  },
                  trgtpos: {
                    chunk: {
                      chunkData: new Uint8Array([0, 0, 128, 63, 0, 0, 0, 64, 0, 0, 64, 64]),
                      header: { dataLen: 12, id: 5, hasSubchunks: false },
                    },
                    data: {
                      x: 1.0,
                      y: 2.0,
                      z: 3.0,
                    },
                  },
                  timestamp: {
                    chunk: {
                      chunkData: new Uint8Array([210, 2, 150, 73, 0, 0, 0, 0]),
                      header: { dataLen: 8, id: 6, hasSubchunks: false },
                    },
                    data: {
                      timestamp: 1234567890n,
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
    decoder: Decoders.DataPacketChunk,
  },
  {
    description: 'InfoTrackerNameChunk',
    bytes: new Uint8Array([0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49]),
    expected: {
      chunk: {
        chunkData: new Uint8Array([84, 114, 97, 99, 107, 101, 114, 32, 49]),
        header: { dataLen: 9, id: 0, hasSubchunks: false },
      },
      data: {
        trackerName: 'Tracker 1',
      },
    },
    decoder: Decoders.InfoTrackerNameChunk,
  },
  {
    description: 'InfoSystemNameChunk',
    bytes: new Uint8Array([1, 0, 10, 0, 80, 83, 78, 32, 83, 101, 114, 118, 101, 114]),
    expected: {
      chunk: {
        chunkData: new Uint8Array([80, 83, 78, 32, 83, 101, 114, 118, 101, 114]),
        header: { dataLen: 10, id: 1, hasSubchunks: false },
      },
      data: {
        systemName: 'PSN Server',
      },
    },
    decoder: Decoders.InfoSystemNameChunk,
  },
  {
    description: 'InfoTrackerChunk',
    bytes: new Uint8Array([1, 0, 13, 128, 0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49]),
    expected: {
      chunk: {
        chunkData: new Uint8Array([0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49]),
        header: { dataLen: 13, id: 1, hasSubchunks: true },
      },
      data: {
        trackerName: {
          chunk: {
            chunkData: new Uint8Array([84, 114, 97, 99, 107, 101, 114, 32, 49]),
            header: { dataLen: 9, id: 0, hasSubchunks: false },
          },
          data: {
            trackerName: 'Tracker 1',
          },
        },
      },
    },
    decoder: Decoders.InfoTrackerChunk,
  },
  {
    description: 'InfoTrackerListChunk',
    bytes: new Uint8Array([2, 0, 17, 128, 1, 0, 13, 128, 0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49]),
    expected: {
      chunk: {
        chunkData: new Uint8Array([1, 0, 13, 128, 0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49]),
        header: { dataLen: 17, id: 2, hasSubchunks: true },
      },
      data: {
        trackers: [
          {
            chunk: {
              chunkData: new Uint8Array([0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49]),
              header: { dataLen: 13, id: 1, hasSubchunks: true },
            },
            data: {
              trackerName: {
                chunk: {
                  chunkData: new Uint8Array([84, 114, 97, 99, 107, 101, 114, 32, 49]),
                  header: { dataLen: 9, id: 0, hasSubchunks: false },
                },
                data: {
                  trackerName: 'Tracker 1',
                },
              },
            },
          },
        ],
      },
    },
    decoder: Decoders.InfoTrackerListChunk,
  },
  {
    description: 'PacketHeaderChunk',
    bytes: new Uint8Array([0, 0, 12, 0, 210, 2, 150, 73, 0, 0, 0, 0, 2, 3, 1, 123]),
    expected: {
      chunk: {
        chunkData: new Uint8Array([210, 2, 150, 73, 0, 0, 0, 0, 2, 3, 1, 123]),
        header: { dataLen: 12, id: 0, hasSubchunks: false },
      },
      data: {
        packetTimestamp: 1234567890n,
        versionHigh: 2,
        versionLow: 3,
        frameId: 1,
        framePacketCount: 123,
      },
    },
    decoder: Decoders.PacketHeaderChunk,
  },
  {
    description: 'InfoPacketChunk',
    bytes: new Uint8Array([
      86, 103, 51, 128, 0, 0, 12, 0, 210, 2, 150, 73, 0, 0, 0, 0, 2, 3, 1, 123, 1, 0, 10, 0, 80, 83, 78, 32, 83, 101,
      114, 118, 101, 114, 2, 0, 17, 128, 1, 0, 13, 128, 0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49,
    ]),
    expected: {
      chunk: {
        chunkData: new Uint8Array([
          0, 0, 12, 0, 210, 2, 150, 73, 0, 0, 0, 0, 2, 3, 1, 123, 1, 0, 10, 0, 80, 83, 78, 32, 83, 101, 114, 118, 101,
          114, 2, 0, 17, 128, 1, 0, 13, 128, 0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49,
        ]),
        header: { dataLen: 51, id: 26454, hasSubchunks: true },
      },
      data: {
        packetHeader: {
          chunk: {
            chunkData: new Uint8Array([210, 2, 150, 73, 0, 0, 0, 0, 2, 3, 1, 123]),
            header: { dataLen: 12, id: 0, hasSubchunks: false },
          },
          data: {
            packetTimestamp: 1234567890n,
            versionHigh: 2,
            versionLow: 3,
            frameId: 1,
            framePacketCount: 123,
          },
        },
        systemName: {
          chunk: {
            chunkData: new Uint8Array([80, 83, 78, 32, 83, 101, 114, 118, 101, 114]),
            header: { dataLen: 10, id: 1, hasSubchunks: false },
          },
          data: {
            systemName: 'PSN Server',
          },
        },
        trackerList: {
          chunk: {
            chunkData: new Uint8Array([1, 0, 13, 128, 0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49]),
            header: { dataLen: 17, id: 2, hasSubchunks: true },
          },
          data: {
            trackers: [
              {
                chunk: {
                  chunkData: new Uint8Array([0, 0, 9, 0, 84, 114, 97, 99, 107, 101, 114, 32, 49]),
                  header: { dataLen: 13, id: 1, hasSubchunks: true },
                },
                data: {
                  trackerName: {
                    chunk: {
                      chunkData: new Uint8Array([84, 114, 97, 99, 107, 101, 114, 32, 49]),
                      header: { dataLen: 9, id: 0, hasSubchunks: false },
                    },
                    data: {
                      trackerName: 'Tracker 1',
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
    decoder: Decoders.InfoPacketChunk,
  },
];

describe('PSN Bytes Decoding', () => {
  goodTests.forEach((bytesTest) => {
    it(bytesTest.description, () => {
      const decoded = bytesTest.decoder(bytesTest.bytes);
      deepEqual(decoded, bytesTest.expected);
    });
  });
});

// TODO(jwetzell): add error tests
const badTests = [];
describe('PSN Bytes Decoding Throws', () => {
  badTests.forEach((bytesTest) => {
    it(bytesTest.description, () => {
      throws(() => {
        bytesTest.decoder(bytesTest.bytes);
      }, bytesTest.throwsMessage);
    });
  });
});
