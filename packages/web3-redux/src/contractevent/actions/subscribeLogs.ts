import { createAction } from '@reduxjs/toolkit';
import { map } from '../../utils/lodash/index.js';
import invariant from 'tiny-invariant';
import { toChecksumAddress, isHexStrict } from '../../utils/web3-utils/index.js';
import { name } from '../common.js';
import { LogsSubscription } from '../model/logsSubscription.js';

/** @internal */
export const SUBSCRIBE_LOGS = `${name}/SUBSCRIBE_LOGS`;
/**
 * @category Actions
 * @link https://web3js.readthedocs.io/en/v1.7.0/web3-eth.html#getpastlogs
 * Get past logs using raw filter.
 */
export const subscribeLogs = createAction(SUBSCRIBE_LOGS, (payload: LogsSubscription) => {
    let address: string | string[] | undefined;
    if (payload.address) {
        if (Array.isArray(payload.address)) {
            address = map(payload.address, toChecksumAddress);
        } else {
            address = toChecksumAddress(payload.address);
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

    return { payload: { ...payload, address } };
});
/** @internal */
export type SubscribeLogsAction = ReturnType<typeof subscribeLogs>;
/** @internal */
export const isSubscribeLogsAction = subscribeLogs.match;

export default subscribeLogs;