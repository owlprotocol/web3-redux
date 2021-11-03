import { Interface, Id, IdArgs, BaseWeb3Contract, getId, validate } from './interface';
import { CallArgsHash, callArgsHash, callHash } from './callArgs';
import { EventSubscription, eventSubscriptionHash, eventId } from './eventSubscription';
import Model from './orm';

export type { Interface, Id, IdArgs, Model };
//alias
export type { Interface as Contract };
export type { BaseWeb3Contract, CallArgsHash, EventSubscription };

export { getId, validate };
export { getId as getContractId, validate as validateContract };
export { callArgsHash, callHash, eventSubscriptionHash, eventId };
