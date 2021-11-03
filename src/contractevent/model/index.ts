import { Interface, IdDeconstructed, getId, getIdDeconstructed, validate, ReturnValues } from './interface';

export type { Interface, IdDeconstructed };
//alias
export type { Interface as ContractEvent, IdDeconstructed as ContractEventId };
export type { ReturnValues };

export { getId, getIdDeconstructed, validate };
export { getId as getContractEventId, validate as validateContractEvent };
