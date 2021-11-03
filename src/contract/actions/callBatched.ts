import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';

export const CALL_BATCHED = `${name}/CALL_BATCHED`;
export interface CallBatchedActionInput {
    networkId: string;
    requests: {
        address: string;
        method: string;
        args?: any[];
        from?: string;
        defaultBlock?: number | 'latest';
        gas?: number;
    }[];
}
/**
 * Optimally batched call requests.
 * Requests are grouped by network and batched with web3.BatchRequest().
 * @see {@link https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#batchrequest}
 *
 * Calls will be batched busing Multicall if:
 *  - network has a Multicall contract
 *  - from == undefined
 *  - defaultBlock == 'latest' || defaultBlock == undefined
 * @see {@link https://github.com/makerdao/multicall}
 */
export const callBatched = createAction<CallBatchedActionInput>(CALL_BATCHED);

export type CallBatchedAction = ReturnType<typeof callBatched>;
export const isCallBatchedAction = callBatched.match;

export default callBatched;
