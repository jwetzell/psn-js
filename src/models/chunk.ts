export interface ChunkHeader {
  id: number;
  dataLen: number;
  hasSubchunks: boolean;
}

export interface Chunk {
  chunkData: Uint8Array;
  header: ChunkHeader;
}
