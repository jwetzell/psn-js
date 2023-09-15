const { Encoder, Tracker } = require('./dist');

const testSizes = [1, 10, 100];

const encoder = new Encoder('test encoder', 2, 3);

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

// TODO(jwetzell): add decode
function benchmark(trackerCount, iterations) {
  const benchmarkResults = {
    encode: {},
  };
  const trackers = getNTrackers(trackerCount);

  const dataEncoderStart = performance.now();
  for (let index = 0; index < iterations; index += 1) {
    encoder.getDataPackets(Date.now(), trackers);
  }
  benchmarkResults.encode.data = performance.now() - dataEncoderStart;

  const infoEncoderStart = performance.now();

  for (let index = 0; index < iterations; index += 1) {
    encoder.getInfoPackets(Date.now(), trackers);
  }
  benchmarkResults.encode.info = performance.now() - infoEncoderStart;
  console.log(
    `encoding ${trackers.length} tracker${trackers.length > 1 ? 's' : ''} ${iterations} time${
      iterations > 1 ? 's' : ''
    }`
  );
  console.table(benchmarkResults);
}

testSizes.forEach((iterations) => {
  testSizes.forEach((trackerCount) => {
    benchmark(trackerCount, iterations);
  });
});
