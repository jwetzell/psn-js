const dgram = require('dgram');
const Decoder = require('../decoder');

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
  if (decoder.info.system_name) {
    console.log(`System Name: ${decoder.info.system_name}`);
  }
  if (Object.keys(decoder.info.trackers).length > 0) {
    console.log(`Tracker Count: ${Object.keys(decoder.info.trackers).length}`);
  }

  Object.entries(decoder.data.trackers).forEach(([trackerId, tracker]) => {
    console.log(
      `Tracker - id: ${trackerId} | name: ${
        decoder.info.trackers[trackerId]?.name ? decoder.info.trackers[trackerId]?.name : ''
      }`
    );
    if (tracker.pos_x !== undefined && tracker.pos_y !== undefined && tracker.pos_z !== undefined) {
      console.log(`\tpos: ${tracker.pos_x}, ${tracker.pos_y}, ${tracker.pos_z}`);
    }

    if (tracker.speed_x !== undefined && tracker.speed_y !== undefined && tracker.speed_z !== undefined) {
      console.log(`\tspeed: ${tracker.speed_x}, ${tracker.speed_y}, ${tracker.speed_z}`);
    }

    if (tracker.ori_x !== undefined && tracker.ori_y !== undefined && tracker.ori_z !== undefined) {
      console.log(`\tori: ${tracker.ori_x}, ${tracker.ori_y}, ${tracker.ori_z}`);
    }

    if (tracker.validity !== undefined) {
      console.log(`\tstatus: ${tracker.validity}`);
    }

    if (tracker.accel_x !== undefined && tracker.accel_y !== undefined && tracker.accel_z !== undefined) {
      console.log(`\taccel: ${tracker.accel_x}, ${tracker.accel_y}, ${tracker.accel_z}`);
    }

    if (tracker.trgtpos_x !== undefined && tracker.trgtpos_y !== undefined && tracker.trgtpos_z !== undefined) {
      console.log(`\ttrgtpos: ${tracker.trgtpos_x}, ${tracker.trgtpos_y}, ${tracker.trgtpos_z}`);
    }

    if (tracker.tracker_timestamp !== undefined) {
      console.log(`\ttimestamp: ${tracker.tracker_timestamp}`);
    }
  });
}, 1000);
