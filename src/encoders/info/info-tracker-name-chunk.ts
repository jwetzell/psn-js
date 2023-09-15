import chunk from '../chunk';

export default (trackerName: string) => chunk(0x0000, Buffer.from(trackerName), false);
