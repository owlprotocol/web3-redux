import { ContractSend, IdDeconstructed, getId, validate, ContractSendStatus } from './interface';

export type { IdDeconstructed };
//alias
export type { ContractSend, IdDeconstructed as ContractSendId };

export { getId, validate };
export { getId as getContractSendId, validate as validateContractSend };
export { ContractSendStatus };
