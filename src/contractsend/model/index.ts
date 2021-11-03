import { Interface, IdDeconstructed, getId, validate, ContractSendStatus } from './interface';

export type { Interface, IdDeconstructed };
//alias
export type { Interface as ContractSend, IdDeconstructed as ContractSendId };

export { getId, validate };
export { getId as getContractSendId, validate as validateContractSend };
export { ContractSendStatus };
