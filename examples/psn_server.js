const dgram = require('dgram');
const Encoder = require('../encoder');
const Tracker = require('../models/Tracker');

const client = dgram.createSocket('udp4');
const encoder = new Encoder('Test PSN Server', 2, 0);

const trackers = [];

trackers.push(new Tracker(0, 'Sun'));
trackers.push(new Tracker(1, 'Mercury'));
trackers.push(new Tracker(2, 'Venus'));
trackers.push(new Tracker(3, 'Earth'));
trackers.push(new Tracker(4, 'Mars'));
trackers.push(new Tracker(5, 'Jupiter'));
trackers.push(new Tracker(6, 'Saturn'));
trackers.push(new Tracker(7, 'Uranus'));
trackers.push(new Tracker(8, 'Neptune'));
trackers.push(new Tracker(9, 'Pluto'));

const orbits = [1.0, 88.0, 224.7, 365.2, 687, 4332, 10760, 30700, 60200, 90600];
const distFromSun = [0, 0.58, 1.08, 1.5, 2.28, 7.78, 14.29, 28.71, 45.04, 59.13];

let timestamp = 0;
setInterval(() => {
  for (let index = 0; index < trackers.length; index += 1) {
    const a = 1.0 / orbits[index];
    const b = distFromSun[index];
    const x = timestamp;
    const cb = Math.cos(a * x) * b;
    const sb = Math.sin(a * x) * b;

    trackers[index].setPos(sb, 0, cb);
    trackers[index].setSpeed(a * cb, 0, -a * sb);
    trackers[index].setOri(0, x / 1000.0, 0);
    trackers[index].setAccel(-a * a * sb, 0, -a * a * cb);
    trackers[index].setTrgtPos(3, 14, 16);
    trackers[index].setStatus(index / 10.0);
    trackers[index].setTimestamp(timestamp);
  }

  const dataPackets = encoder.getDataPackets(timestamp, trackers);

  dataPackets.forEach((packet) => {
    client.send(packet, 56565, '236.10.10.10');
  });
  timestamp += 1;
}, 20);

setInterval(() => {
  const infoPackets = encoder.getInfoPackets(timestamp, trackers);
  infoPackets.forEach((packet) => {
    client.send(packet, 56565, '236.10.10.10');
  });
}, 1000);
