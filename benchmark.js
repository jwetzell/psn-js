const { Encoder, Decoder, Tracker } = require('./dist/cjs');

const testSizes = [1, 10, 100, 1000];

const encoder = new Encoder('test encoder', 2, 3);
const decoder = new Decoder();

function getNTrackers(n) {
  const trackers = [];
  for (let index = 0; index < n; index += 1) {
    const tracker = new Tracker(index, `Tracker ${index}`);
    tracker.setPos(0, 0, 0);
    tracker.setSpeed(0, 0, 0);
    tracker.setOri(0, 0, 0);
    tracker.setAccel(0, 0, 0);
    tracker.setTrgtPos(0, 0, 0);
    tracker.setStatus(1.0);
    tracker.setTimestamp(Date.now());
    trackers.push(tracker);
  }
  return trackers;
}

function benchmark(trackerCount, iterations) {
  const benchmarkResults = {
    data: {},
    info: {},
  };
  const trackers = getNTrackers(trackerCount);
  console.log(
    `processing ${trackers.length} tracker${trackers.length > 1 ? 's' : ''} ${iterations} time${
      iterations > 1 ? 's' : ''
    }`
  );

  let latestEncodedPackets;

  // DATA
  const dataEncoderStart = performance.now();
  for (let index = 0; index < iterations; index += 1) {
    latestEncodedPackets = encoder.getDataPackets(Date.now(), trackers);
  }
  benchmarkResults.data.encode = performance.now() - dataEncoderStart;

  const dataDecodedStart = performance.now();
  for (let index = 0; index < iterations; index += 1) {
    latestEncodedPackets.forEach((packet) => {
      decoder.decode(packet);
    });
  }
  benchmarkResults.data.decode = performance.now() - dataDecodedStart;

  // INFO
  const infoEncoderStart = performance.now();
  for (let index = 0; index < iterations; index += 1) {
    latestEncodedPackets = encoder.getInfoPackets(Date.now(), trackers);
  }
  benchmarkResults.info.encode = performance.now() - infoEncoderStart;

  const infoDecodeStart = performance.now();
  for (let index = 0; index < iterations; index += 1) {
    latestEncodedPackets.forEach((packet) => {
      decoder.decode(packet);
    });
  }
  benchmarkResults.info.decode = performance.now() - infoDecodeStart;

  console.log(benchmarkResults);
}

testSizes.forEach((iterations) => {
  testSizes.forEach((trackerCount) => {
    benchmark(trackerCount, iterations);
  });
});
