import chunk from '../chunk';

export default (trackerName: string) => chunk(0x0000, new TextEncoder().encode(trackerName), false);
