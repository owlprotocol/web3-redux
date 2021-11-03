import { Interface, IdDeconstructed, getId, getIdDeconstructed, validate, ReturnValues } from './interface';
import Model from './orm';

export type { Interface, IdDeconstructed };
//alias
export type { Interface as ContractEvent, IdDeconstructed as ContractEventId };
export type { ReturnValues };

export { getId, getIdDeconstructed, validate, Model };
export { getId as getContractEventId, validate as validateContractEvent };
