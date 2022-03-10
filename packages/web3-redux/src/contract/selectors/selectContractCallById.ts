import { selectEthCallId } from './selectEthCallId.js';
import { BaseWeb3Contract, CallArgsHash } from '../model/index.js';
import { Await } from '../../types/promise.js';
import { ContractId } from '../model/interface.js';

import selectEthCallById from '../../ethcall/selectors/selectByIdSingle.js';

//Contract Call
/** @category Selectors */
export function selectContractCallById<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
    >(
        state: any,
        idArgs: ContractId | undefined,
        methodName: K | undefined,
        callArgs?: CallArgsHash<Parameters<T['methods'][K]>>,
): Await<ReturnType<ReturnType<T['methods'][K]>['call']>> | undefined {
    if (!idArgs) return undefined;
    const ethCallId = selectEthCallId(state, idArgs, methodName, callArgs);
    const ethCall = selectEthCallById(state, ethCallId);

    return ethCall?.returnValue;
}

/** @category Selectors */
export function selectContractCallFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
    >(methodName: K) {
    type U = Await<ReturnType<ReturnType<T['methods'][K]>['call']>>;
    return (
        state: any,
        idArgs: ContractId | undefined,
        args?: Parameters<T['methods'][K]>,
        options?: CallArgsHash<Parameters<T['methods'][K]>>,
    ): U | undefined => {
        return selectContractCallById<T, K>(state, idArgs, methodName, { args, ...options });
    };
}

export const selectContractCall = selectContractCallById;
export default selectContractCall;
