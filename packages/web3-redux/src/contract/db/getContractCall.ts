import getEthCall from './getEthCall.js';
import { Await } from '../../types/promise.js';
import { BaseWeb3Contract } from '../model/index.js';

/**
 * Recursively searches for CID at file at <BASE_CID>/path/to/file
 */
export async function getContractCall<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['methods'] = string,
>(
    state: any,
    networkId: string | undefined,
    address: string | undefined,
    method: K | undefined,
    args?: Parameters<T['methods'][K]>,
) {
    const ethCall = await getEthCall(state, networkId, address, method, args);
    const returnValue = ethCall?.returnValue as Await<ReturnType<ReturnType<T['methods'][K]>['call']>> | undefined;
    return returnValue;
}

export default getContractCall;
