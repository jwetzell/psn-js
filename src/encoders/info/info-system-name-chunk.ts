import chunk from '../chunk';

export default (systemName: string): Buffer => chunk(0x0001, Buffer.from(systemName), false);
