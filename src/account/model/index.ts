import { Interface, IdDeconstructed, getId, getIdDeconstructed, validate } from './interface';
import Model from './orm';

export type { Interface, IdDeconstructed };
//alias
export type { Interface as Account, IdDeconstructed as AccountId };

export { getId, getIdDeconstructed, validate, Model };
export { getId as getAccountId, validate as validateAccount };
