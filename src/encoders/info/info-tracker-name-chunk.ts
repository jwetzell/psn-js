import chunk from '../chunk';

const nameEncoder = new TextEncoder();
export default (trackerName: string) => chunk(0x0000, nameEncoder.encode(trackerName), false);
