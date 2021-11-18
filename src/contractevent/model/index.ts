import { Interface, IdDeconstructed, IdArgs, getId, getIdDeconstructed, validate, ReturnValues } from './interface';

export type { Interface, IdDeconstructed, IdArgs };
//alias
export type { Interface as ContractEvent, IdDeconstructed as ContractEventId };
export type { ReturnValues };

export { getId, getIdDeconstructed, validate };
export { getId as getContractEventId, validate as validateContractEvent };
