import { Interface, IdDeconstructed, getId, validate } from './interface';
import Model from './orm';

export type { Interface, IdDeconstructed };
//alias
export type { Interface as EthCall, IdDeconstructed as EthCallId };

export { getId, validate, Model };
export { getId as getEthCallId, validate as validateEthCall };
