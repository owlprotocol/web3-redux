import { Interface, IdDeconstructed, getId, validate } from './interface';

export type { Interface, IdDeconstructed };
//alias
export type { Interface as EthCall, IdDeconstructed as EthCallId };

export { getId, validate };
export { getId as getEthCallId, validate as validateEthCall };
