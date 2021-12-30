import { EthCall, IdDeconstructed, getId, validate } from './interface';

export type { IdDeconstructed };
//alias
export type { EthCall, IdDeconstructed as EthCallId };

export { getId, validate };
export { getId as getEthCallId, validate as validateEthCall };
