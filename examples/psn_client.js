// recreation of psn_client.cpp example from https://github.com/vyv/psn-cpp
const dgram = require('dgram');
const { Decoder } = require('../dist/cjs');

const client = dgram.createSocket('udp4');
const decoder = new Decoder();

client.on('listening', () => {
  client.addMembership('236.10.10.10');
});

client.on('message', (buffer) => {
  decoder.decode(buffer);
});
client.bind(56565, '0.0.0.0');

setInterval(() => {
  if (decoder.system_name) {
    console.log(`System Name: ${decoder.system_name}`);
  }
  if (Object.keys(decoder.trackers).length > 0) {
    console.log(`Tracker Count: ${Object.keys(decoder.trackers).length}`);
  }

  Object.entries(decoder.trackers).forEach(([trackerId, tracker]) => {
    const trackerName = decoder.trackers[trackerId]?.name;
    console.log(`Tracker - id: ${trackerId} | name: ${trackerName || ''}`);
    if (tracker.pos) {
      console.log(`\tpos: ${tracker.pos.x}, ${tracker.pos.x}, ${tracker.pos.x}`);
    }

    if (tracker.speed) {
      console.log(`\tspeed: ${tracker.speed.x}, ${tracker.speed.y}, ${tracker.speed.z}`);
    }

    if (tracker.ori) {
      console.log(`\tori: ${tracker.ori.x}, ${tracker.ori.y}, ${tracker.ori.z}`);
    }

    if (tracker.status) {
      console.log(`\tstatus: ${tracker.status.validity}`);
    }

    if (tracker.accel) {
      console.log(`\taccel: ${tracker.accel.x}, ${tracker.accel.y}, ${tracker.accel.z}`);
    }

    if (tracker.trgtpos) {
      console.log(`\ttrgtpos: ${tracker.trgtpos.x}, ${tracker.trgtpos.y}, ${tracker.trgtpos.z}`);
    }

    if (tracker.timestamp) {
      console.log(`\ttimestamp: ${tracker.timestamp}`);
    }
  });
}, 1000);
