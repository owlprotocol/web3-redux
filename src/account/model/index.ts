import { Interface, IdDeconstructed, getId, getIdDeconstructed, validate } from './interface';

export type { Interface, IdDeconstructed };
//alias
export type { Interface as Account, IdDeconstructed as AccountId };

export { getId, getIdDeconstructed, validate };
export { getId as getAccountId, validate as validateAccount };
