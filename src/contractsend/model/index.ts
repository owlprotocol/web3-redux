import { ContractSend, ContractSendId, getId, validate, ContractSendStatus } from './interface';

export type { ContractSend, ContractSendId };

export { getId, validate };
export { getId as getContractSendId, validate as validateContractSend };
export { ContractSendStatus };
