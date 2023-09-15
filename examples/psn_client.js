// recreation of psn_client.cpp example from https://github.com/vyv/psn-cpp
const dgram = require('dgram');
const { Decoder } = require('..');

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
    console.log(
      `Tracker - id: ${trackerId} | name: ${
        decoder.trackers[trackerId]?.tracker_name ? decoder.trackers[trackerId]?.tracker_name : ''
      }`
    );
    if (tracker.pos) {
      console.log(`\tpos: ${tracker.pos.pos_x}, ${tracker.pos.pos_y}, ${tracker.pos.pos_z}`);
    }

    if (tracker.speed) {
      console.log(`\tspeed: ${tracker.speed.speed_x}, ${tracker.speed.speed_y}, ${tracker.speed.speed_z}`);
    }

    if (tracker.ori) {
      console.log(`\tori: ${tracker.ori.ori_x}, ${tracker.ori.ori_y}, ${tracker.ori.ori_z}`);
    }

    if (tracker.status) {
      console.log(`\tstatus: ${tracker.status.validity}`);
    }

    if (tracker.accel) {
      console.log(`\taccel: ${tracker.accel.accel_x}, ${tracker.accel.accel_y}, ${tracker.accel.accel_z}`);
    }

    if (tracker.trgtpos) {
      console.log(
        `\ttrgtpos: ${tracker.trgtpos.trgtpos_x}, ${tracker.trgtpos.trgtpos_y}, ${tracker.trgtpos.trgtpos_z}`
      );
    }

    if (tracker.timestamp) {
      console.log(`\ttimestamp: ${tracker.timestamp.tracker_timestamp}`);
    }
  });
}, 1000);
