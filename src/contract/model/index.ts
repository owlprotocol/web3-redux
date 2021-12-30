import { Contract, IdDeconstructed, BaseWeb3Contract, getId, validate } from './interface';
import { CallArgsHash, callArgsHash, callHash } from './callArgs';
import { EventSubscription, eventSubscriptionHash, eventId } from './eventSubscription';

export type { Contract, IdDeconstructed };
export type { IdDeconstructed as ContractId };
export type { BaseWeb3Contract, CallArgsHash, EventSubscription };

export { getId, validate };
export { getId as getContractId, validate as validateContract };
export { callArgsHash, callHash, eventSubscriptionHash, eventId };

export default {
    getId,
    getContractId: getId,
    validate,
    validateContract: validate,
    callArgsHash,
    callHash,
    eventSubscriptionHash,
    eventId,
};
