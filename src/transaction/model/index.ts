import { Interface, IdDeconstructed, getId, validate } from './interface';

export type { Interface, IdDeconstructed };
//alias
export type { Interface as Transaction, IdDeconstructed as TransactionId };

export { getId, validate };
export { getId as getTransactionId, validate as validateTransaction };
