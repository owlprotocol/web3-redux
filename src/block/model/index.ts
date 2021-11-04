import { Id, IdDeconstructed, IdArgs, getId, getIdDeconstructed } from './id';
import { Interface, validate } from './interface';
import BlockHeader from './BlockHeader';
import BlockTransaction from './BlockTransaction';

export type { Interface, Id, IdDeconstructed, IdArgs };
//alias
export type { Interface as Block, IdDeconstructed as BlockId };
export type { BlockHeader, BlockTransaction };

export { getId, getIdDeconstructed, validate };
export { getId as getBlockId, validate as validateBlock };
