import { Interface, IdDeconstructed, getId, getIdDeconstructed, validate } from './interface';
import BlockHeader from './BlockHeader';
import BlockTransaction from './BlockTransaction';

export type { Interface, IdDeconstructed };
//alias
export type { Interface as Block, IdDeconstructed as BlockId };
export type { BlockHeader, BlockTransaction };

export { getId, getIdDeconstructed, validate };
export { getId as getBlockId, validate as validateBlock };
