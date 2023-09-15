import chunk from '../chunk';

export default (trackerChunks: Buffer[]): Buffer => chunk(0x0002, Buffer.concat(trackerChunks), true);
