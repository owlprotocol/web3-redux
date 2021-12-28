import { BaseWeb3Contract, CallArgsHash, getId } from '../model';
import { Await } from '../../types/promise';
import { IdArgs } from '../model/interface';

import selectEthCallById from '../../ethcall/selectors/selectByIdSingle';
import selectEthCallId from './selectEthCallId';

//Contract Call
/** @category Selectors */
export function selectContractCallById<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
>(
    state: any,
    idArgs: IdArgs | undefined,
    methodName: K | undefined,
    callArgs?: CallArgsHash<Parameters<T['methods'][K]>>,
): Await<ReturnType<ReturnType<T['methods'][K]>['call']>> | undefined {
    if (!idArgs) return undefined;
    const id = getId(idArgs);
    const ethCallId = selectEthCallId(state, id, methodName, callArgs);
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
        idArgs: IdArgs | undefined,
        args?: Parameters<T['methods'][K]>,
        options?: CallArgsHash<Parameters<T['methods'][K]>>,
    ): U | undefined => {
        return selectContractCallById<T, K>(state, idArgs, methodName, { args, ...options });
    };
}

export default selectContractCallById;
