import chunk from '../chunk';
const nameEncoder = new TextEncoder();
export default (systemName: string): Uint8Array => chunk(0x0001, nameEncoder.encode(systemName), false);
