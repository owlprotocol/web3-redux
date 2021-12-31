import { ContractEvent, ContractEventId, getId, getIdDeconstructed, validate, ReturnValues } from './interface';

export type { ContractEvent, ContractEventId };
export type { ReturnValues };

export { getId, getIdDeconstructed, validate };
export { getId as getContractEventId, validate as validateContractEvent };
