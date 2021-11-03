import { Interface, IdDeconstructed, getId, validate } from './interface';
import Model from './orm';

export type { Interface, IdDeconstructed };
//alias
export type { Interface as Transaction, IdDeconstructed as TransactionId };

export { getId, validate, Model };
export { getId as getTransactionId, validate as validateTransaction };
