import { createSelector } from 'redux-orm';
import { BaseWeb3Contract, CallArgsHash, callArgsHash, Contract, getId } from '../model';
import { getOrm } from '../../orm';
import { EthCall } from '../../ethcall/model';
import { Await } from '../../types/promise';
import { IdArgs } from '../model/interface';

//Contract Call
const contractCallSelect = createSelector(
    getOrm(),
    (_1: string, id: string) => id,
    (_1: string, _2: string, methodName: string) => methodName,
    (_1: string, _2: string, _3: string, callArgs?: CallArgsHash) => callArgs,
    (session: any, id: string, methodName: string, callArgs?: CallArgsHash) => {
        if (!id || !methodName) return undefined;

        const contract: Contract | undefined = session.Contract.withId(id);
        if (!contract) return undefined;
        if (!contract.methods) return undefined;

        const method = contract.methods[methodName];
        if (!method) return undefined;

        const hash = callArgsHash(callArgs);
        if (!method[hash]) return undefined;
        const { ethCallId } = method[hash];
        if (!ethCallId) return undefined;

        const ethCall: EthCall = session.EthCall.withId(ethCallId);
        if (!ethCall) return undefined;

        return ethCall.returnValue;
    },
);
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
    return contractCallSelect(state, id, methodName, callArgs);
}

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
