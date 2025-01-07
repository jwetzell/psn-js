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
import { DataTrackerChunk } from './data/data-tracker-chunk';
import { InfoTrackerChunk } from './info/info-tracker-chunk';

export type XYZData = {
  x: number;
  y: number;
  z: number;
};

export class Tracker {
  id: number;
  name: string;
  pos?: XYZData;
  speed?: XYZData;
  ori?: XYZData;
  validity?: number;
  accel?: XYZData;
  trgtpos?: XYZData;
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
    if (this.pos === undefined) {
      this.pos = {
        x,
        y,
        z,
      };
    } else {
      this.pos.x = x;
      this.pos.y = y;
      this.pos.z = z;
    }
  }

  setSpeed(x: number, y: number, z: number) {
    if (this.speed === undefined) {
      this.speed = {
        x,
        y,
        z,
      };
    } else {
      this.speed.x = x;
      this.speed.y = y;
      this.speed.z = z;
    }
  }

  setOri(x: number, y: number, z: number) {
    if (this.ori === undefined) {
      this.ori = {
        x,
        y,
        z,
      };
    } else {
      this.ori.x = x;
      this.ori.y = y;
      this.ori.z = z;
    }
  }

  setStatus(validity: number) {
    this.validity = validity;
  }

  setAccel(x: number, y: number, z: number) {
    if (this.accel === undefined) {
      this.accel = {
        x,
        y,
        z,
      };
    } else {
      this.accel.x = x;
      this.accel.y = y;
      this.accel.z = z;
    }
  }

  setTrgtPos(x: number, y: number, z: number) {
    if (this.trgtpos === undefined) {
      this.trgtpos = {
        x,
        y,
        z,
      };
    } else {
      this.trgtpos.x = x;
      this.trgtpos.y = y;
      this.trgtpos.z = z;
    }
  }

  setTimestamp(timestamp: bigint) {
    this.timestamp = timestamp;
  }

  getDataChunk() {
    const fieldChunks: Uint8Array[] = [];

    if (this.pos) {
      fieldChunks.push(dataTrackerPosChunk(this.pos.x, this.pos.y, this.pos.z));
    }

    if (this.speed) {
      fieldChunks.push(dataTrackerSpeedChunk(this.speed.x, this.speed.y, this.speed.z));
    }

    if (this.ori) {
      fieldChunks.push(dataTrackerOriChunk(this.ori.x, this.ori.y, this.ori.z));
    }

    if (this.validity) {
      fieldChunks.push(dataTrackerStatusChunk(this.validity));
    }

    if (this.accel) {
      fieldChunks.push(dataTrackerAccelChunk(this.accel.x, this.accel.y, this.accel.z));
    }

    if (this.trgtpos) {
      fieldChunks.push(dataTrackerTrgtposChunk(this.trgtpos.x, this.trgtpos.y, this.trgtpos.z));
    }

    if (this.timestamp) {
      fieldChunks.push(dataTrackerTimestampChunk(this.timestamp));
    }

    return dataTrackerChunk(this.id, fieldChunks);
  }

  getInfoChunk() {
    return infoTrackerChunk(this.id, infoTrackerNameChunk(this.name));
  }

  updateInfo(infoTrackerChunk: InfoTrackerChunk) {
    if (infoTrackerChunk.data) {
      this.name = infoTrackerChunk.data.trackerName.data.trackerName;
    }
  }

  updateData(dataTrackerChunk: DataTrackerChunk) {
    if (dataTrackerChunk.data.pos) {
      this.setPos(dataTrackerChunk.data.pos.data.x, dataTrackerChunk.data.pos.data.y, dataTrackerChunk.data.pos.data.z);
    }

    if (dataTrackerChunk.data.speed) {
      this.setSpeed(
        dataTrackerChunk.data.speed.data.x,
        dataTrackerChunk.data.speed.data.y,
        dataTrackerChunk.data.speed.data.z
      );
    }

    if (dataTrackerChunk.data.ori) {
      this.setOri(dataTrackerChunk.data.ori.data.x, dataTrackerChunk.data.ori.data.y, dataTrackerChunk.data.ori.data.z);
    }

    if (dataTrackerChunk.data.status) {
      this.setStatus(dataTrackerChunk.data.status.data.validity);
    }

    if (dataTrackerChunk.data.accel) {
      this.setAccel(
        dataTrackerChunk.data.accel.data.x,
        dataTrackerChunk.data.accel.data.y,
        dataTrackerChunk.data.accel.data.z
      );
    }

    if (dataTrackerChunk.data.trgtpos) {
      this.setTrgtPos(
        dataTrackerChunk.data.trgtpos.data.x,
        dataTrackerChunk.data.trgtpos.data.y,
        dataTrackerChunk.data.trgtpos.data.z
      );
    }

    if (dataTrackerChunk.data.timestamp) {
      this.setTimestamp(dataTrackerChunk.data.timestamp.data.timestamp);
    }
  }
}

export function TrackerFromInfo(infoTrackerChunk: InfoTrackerChunk) {
  if (infoTrackerChunk.data) {
    return new Tracker(infoTrackerChunk.chunk.header.id, infoTrackerChunk.data.trackerName.data.trackerName);
  }
  return undefined;
}

export function TrackerFromData(dataTrackerChunk: DataTrackerChunk) {
  if (dataTrackerChunk.data) {
    const tracker = new Tracker(dataTrackerChunk.chunk.header.id, '');
    tracker.updateData(dataTrackerChunk);
    return tracker;
  }
  return undefined;
}
