import { BlockId, getId, getIdDeconstructed } from './id';
import { validate } from './interface';
import BlockHeader from './BlockHeader';
import BlockTransaction from './BlockTransaction';

export type { BlockId };
export type { BlockHeader, BlockTransaction };

export { getId, getIdDeconstructed, validate };
export { getId as getBlockId, validate as validateBlock };
