import { EthCall, EthCallId, getId, getIdArgs, validate } from './interface.js';

export type { EthCall, EthCallId as EthCallId };

export { getId, getIdArgs, validate };
export { getId as getEthCallId, getIdArgs as getEthCallIdArgs, validate as validateEthCall };
