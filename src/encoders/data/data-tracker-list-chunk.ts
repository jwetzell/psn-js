import chunk from '../chunk';

export default (trackerChunks: Buffer[]) => chunk(0x0001, Buffer.concat(trackerChunks), true);
