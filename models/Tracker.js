const dataTrackerAccelChunk = require('../encoders/data/data-tracker-accel-chunk');
const dataTrackerChunk = require('../encoders/data/data-tracker-chunk');
const dataTrackerOriChunk = require('../encoders/data/data-tracker-ori-chunk');
const dataTrackerPosChunk = require('../encoders/data/data-tracker-pos-chunk');
const dataTrackerSpeedChunk = require('../encoders/data/data-tracker-speed-chunk');
const dataTrackerStatusChunk = require('../encoders/data/data-tracker-status-chunk');
const dataTrackerTimestampChunk = require('../encoders/data/data-tracker-timestamp-chunk');
const dataTrackerTrgtposChunk = require('../encoders/data/data-tracker-trgtpos-chunk');
const infoTrackerChunk = require('../encoders/info/info-tracker-chunk');
const infoTrackerNameChunk = require('../encoders/info/info-tracker-name-chunk');

class Tracker {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.pos = undefined;
    this.speed = undefined;
    this.ori = undefined;
    this.validity = undefined;
    this.accel = undefined;
    this.trgtpos = undefined;
    this.timestamp = undefined;
  }

  setPos(x, y, z) {
    this.pos = [x, y, z];
  }

  setSpeed(x, y, z) {
    this.speed = [x, y, z];
  }

  setOri(x, y, z) {
    this.ori = [x, y, z];
  }

  setStatus(validity) {
    this.validity = validity;
  }

  setAccel(x, y, z) {
    this.accel = [x, y, z];
  }

  setTrgtPos(x, y, z) {
    this.trgtpos = [x, y, z];
  }

  setTimestamp(timestamp) {
    this.timestamp = timestamp;
  }

  getDataChunk() {
    const fieldChunks = [];

    if (this.pos) {
      fieldChunks.push(dataTrackerPosChunk(...this.pos));
    }

    if (this.speed) {
      fieldChunks.push(dataTrackerSpeedChunk(...this.speed));
    }

    if (this.ori) {
      fieldChunks.push(dataTrackerOriChunk(...this.ori));
    }

    if (this.validity) {
      fieldChunks.push(dataTrackerStatusChunk(this.validity));
    }

    if (this.accel) {
      fieldChunks.push(dataTrackerAccelChunk(...this.accel));
    }

    if (this.trgtpos) {
      fieldChunks.push(dataTrackerTrgtposChunk(...this.trgtpos));
    }

    if (this.timestamp) {
      fieldChunks.push(dataTrackerTimestampChunk(this.timestamp));
    }

    return dataTrackerChunk(this.id, fieldChunks);
  }

  getInfoChunk() {
    return infoTrackerChunk(this.id, infoTrackerNameChunk(this.name));
  }
}

module.exports = Tracker;
