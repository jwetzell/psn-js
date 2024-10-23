import chunk from '../chunk';

export default (systemName: string): Uint8Array => chunk(0x0001, new TextEncoder().encode(systemName), false);
