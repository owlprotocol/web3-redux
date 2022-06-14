import { createAction } from '@reduxjs/toolkit';
import { map } from '../../utils/lodash/index.js';
import invariant from 'tiny-invariant';
import { toChecksumAddress, isHexStrict } from '../../utils/web3-utils/index.js';
import { name } from '../common.js';

/** @internal */
export const GET_PAST_LOGS = `${name}/GET_PAST_LOGS`;
/** @internal */
export interface GetPastLogsActionInput {
    networkId: string;
    address?: string | string[];
    topics?: (null | string | string[])[];
    fromBlock?: number | 'earliest';
    toBlock?: number | 'latest';
}
/**
 * @category Actions
 * @link https://web3js.readthedocs.io/en/v1.7.0/web3-eth.html#getpastlogs
 * Get past logs using raw filter.
 */
export const getPastLogs = createAction(GET_PAST_LOGS, (payload: GetPastLogsActionInput) => {
    let fromBlock: number;
    if (!payload.fromBlock || payload.fromBlock == 'earliest') {
        fromBlock = 0;
    } else {
        fromBlock = payload.fromBlock;
    }

    let toBlock: number | 'latest';
    if (!payload.toBlock || payload.toBlock === 'latest') {
        toBlock = 'latest';
    } else {
        toBlock = payload.toBlock;
    }

    let address: string | string[] | undefined;
    if (payload.address) {
        if (Array.isArray(payload.address)) {
            address = map(payload.address, toChecksumAddress);
        } else {
            address = toChecksumAddress(payload.address.slice());
        }
    }

    if (payload.topics) {
        payload.topics.forEach((topic) => {
            if (topic) {
                if (Array.isArray(topic)) {
                    topic.forEach((t) => invariant(isHexStrict(t), `topic ${t} is not hex!`));
                } else {
                    invariant(isHexStrict(topic), `topic ${topic} is not hex!`);
                }
            }
            return topic;
        });
    }

    return { payload: { ...payload, fromBlock, toBlock, address } };
});
/** @internal */
export type GetPastLogsAction = ReturnType<typeof getPastLogs>;
/** @internal */
export const isGetPastLogsAction = getPastLogs.match;

export default getPastLogs;
