import chunk from '../chunk.js';

const nameEncoder = new TextEncoder();
export default (trackerName: string) => chunk(0x0000, nameEncoder.encode(trackerName), false);
