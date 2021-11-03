import { Interface, Id, IdDeconstructed, validate, getId } from './interface';
import Model from './orm';

export type { Interface, Id, IdDeconstructed, Model };
//aliases
export type { Interface as Transaction };

export { validate, getId };
export { validate as validateTransaction, getId as getTransactionId };
