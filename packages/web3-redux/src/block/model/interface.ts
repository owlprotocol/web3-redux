import { BlockId } from './id.js';

export type { BlockHeader } from './BlockHeader.js';

export type BlockIndexInput = BlockId | { networkId: string } | { hash: string } | { timestamp: string };
export const BlockIndex = '[networkId+number], networkId, hash, timestamp';
