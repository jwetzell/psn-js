export interface Chunk {
  id?: number;
  has_subchunks?: boolean;
  data_len?: number;
  chunk_data?: Uint8Array;
}
