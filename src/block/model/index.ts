import BlockHeader from './BlockHeader';
import BlockTransaction from './BlockTransaction';
import { Interface, validate, getId } from './interface';
import Model from './orm';

export type { Interface, BlockHeader, BlockTransaction };
export type { Interface as Block };

export { Model, validate, getId };
export { validate as validateBlock, getId as getBlockId };
