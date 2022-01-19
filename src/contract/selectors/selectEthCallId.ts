import { createSelector } from 'redux-orm';
import { BaseWeb3Contract, CallArgsHash, Contract, getId } from '../model';
import { getOrm } from '../../orm';
import { getEthCallId } from '../../ethcall/model';
import { ContractId } from '../model/interface';

//Contract Call
const selectEthCallIdSelector = createSelector(
    getOrm(),
    (_1: string, id: string) => id,
    (_1: string, _2: string, methodName: string) => methodName,
    (_1: string, _2: string, _3: string, callArgs?: CallArgsHash) => callArgs,
    (session: any, id: string, methodName: string, callArgs?: CallArgsHash) => {
        if (!id || !methodName) return undefined;

        const contract: Contract | undefined = session.Contract.withId(id);
        if (!contract) return undefined;
        const { args, defaultBlock, from } = callArgs ?? {};
        const web3Contract = contract.web3Contract ?? contract.web3SenderContract;
        if (!web3Contract) throw new Error(`Contract ${id} has no web3 contract`);
        let tx: any;
        if (!args || args.length == 0) {
            tx = web3Contract.methods[methodName]();
        } else {
            tx = web3Contract.methods[methodName](...args);
        }
        const data = tx.encodeABI();
        const ethCallId = getEthCallId({
            networkId: contract.networkId,
            from,
            to: contract.address,
            defaultBlock,
            data,
        });

        return ethCallId;
    },
);

/** @category Selectors */
export function selectEthCallId<T extends BaseWeb3Contract = BaseWeb3Contract, K extends keyof T['methods'] = string>(
    state: any,
    idArgs: ContractId | undefined,
    methodName: K | undefined,
    callArgs?: CallArgsHash<Parameters<T['methods'][K]>>,
): string | undefined {
    if (!idArgs) return undefined;
    const id = getId(idArgs);
    return selectEthCallIdSelector(state, id, methodName, callArgs);
}

export default selectEthCallId;
