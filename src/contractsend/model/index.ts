import { Interface, IdDeconstructed, getId, validate, ContractSendStatus } from './interface';
import Model from './orm';

export type { Interface, IdDeconstructed };
//alias
export type { Interface as ContractSend, IdDeconstructed as ContractSendId };

export { getId, validate, Model };
export { getId as getContractSendId, validate as validateContractSend };
export { ContractSendStatus };
