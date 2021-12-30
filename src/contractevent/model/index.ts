import { ContractEvent, IdDeconstructed, IdArgs, getId, getIdDeconstructed, validate, ReturnValues } from './interface';

export type { IdDeconstructed, IdArgs };
export type { ContractEvent, IdDeconstructed as ContractEventId };
export type { ReturnValues };

export { getId, getIdDeconstructed, validate };
export { getId as getContractEventId, validate as validateContractEvent };
