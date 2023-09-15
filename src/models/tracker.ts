import dataTrackerAccelChunk from '../encoders/data/data-tracker-accel-chunk';
import dataTrackerChunk from '../encoders/data/data-tracker-chunk';
import dataTrackerOriChunk from '../encoders/data/data-tracker-ori-chunk';
import dataTrackerPosChunk from '../encoders/data/data-tracker-pos-chunk';
import dataTrackerSpeedChunk from '../encoders/data/data-tracker-speed-chunk';
import dataTrackerStatusChunk from '../encoders/data/data-tracker-status-chunk';
import dataTrackerTimestampChunk from '../encoders/data/data-tracker-timestamp-chunk';
import dataTrackerTrgtposChunk from '../encoders/data/data-tracker-trgtpos-chunk';
import infoTrackerChunk from '../encoders/info/info-tracker-chunk';
import infoTrackerNameChunk from '../encoders/info/info-tracker-name-chunk';

export class Tracker {
  id: number;
  name: string;
  pos?: [number, number, number];
  speed?: [number, number, number];
  ori?: [number, number, number];
  validity?: number;
  accel?: [number, number, number];
  trgtpos?: [number, number, number];
  timestamp?: bigint;

  constructor(id: number, name: string) {
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

  setPos(x: number, y: number, z: number) {
    this.pos = [x, y, z];
  }

  setSpeed(x: number, y: number, z: number) {
    this.speed = [x, y, z];
  }

  setOri(x: number, y: number, z: number) {
    this.ori = [x, y, z];
  }

  setStatus(validity: number) {
    this.validity = validity;
  }

  setAccel(x: number, y: number, z: number) {
    this.accel = [x, y, z];
  }

  setTrgtPos(x: number, y: number, z: number) {
    this.trgtpos = [x, y, z];
  }

  setTimestamp(timestamp: bigint) {
    this.timestamp = timestamp;
  }

  getDataChunk() {
    const fieldChunks: Buffer[] = [];

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
