import { Interface, IdDeconstructed, BaseWeb3Contract, getId, validate } from './interface';
import { CallArgsHash, callArgsHash, callHash } from './callArgs';
import { EventSubscription, eventSubscriptionHash, eventId } from './eventSubscription';

export type { Interface, IdDeconstructed };
//alias
export type { Interface as Contract, IdDeconstructed as ContractId };
export type { BaseWeb3Contract, CallArgsHash, EventSubscription };

export { getId, validate };
export { getId as getContractId, validate as validateContract };
export { callArgsHash, callHash, eventSubscriptionHash, eventId };
