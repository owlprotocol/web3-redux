import { EventChannel, eventChannel, END, TakeableChannel } from 'redux-saga';
import { put, call, cancel, take, fork, select } from 'typed-redux-saga';
import { Action } from 'redux';
import type { Subscription } from 'web3-core-subscriptions';
import type { Log } from 'web3-core';

import { selectByIdSingle as selectNetwork } from '../../network/selectors/index.js';
import {
    createAction as createEvent,
    SubscribeLogsAction,
    SUBSCRIBE_LOGS,
    isSubscribeLogsAction,
    isUnsubscribeLogsAction,
} from '../actions/index.js';
import { UnsubscribeLogsAction } from '../actions/unsubscribeLogs.js';
import { getLogsSubscriptionId } from '../model/logsSubscription.js';

const SUBSCRIBE_DATA = `${SUBSCRIBE_LOGS}/DATA`;
const SUBSCRIBE_ERROR = `${SUBSCRIBE_LOGS}/ERROR`;
const SUBSCRIBE_CHANGED = `${SUBSCRIBE_LOGS}/CHANGED`;
const SUBSCRIBE_DONE = `${SUBSCRIBE_LOGS}/DONE`;
interface SubscribeLogsChannelMessage {
    type: typeof SUBSCRIBE_DATA | typeof SUBSCRIBE_ERROR | typeof SUBSCRIBE_CHANGED;
    error?: any;
    log?: Log;
}

function subscribeLogsChannel(subscription: Subscription<Log>): EventChannel<SubscribeLogsChannelMessage> {
    return eventChannel((emitter) => {
        subscription
            .on('data', (log: Log) => {
                emitter({ type: SUBSCRIBE_DATA, log });
            })
            .on('error', (error: any) => {
                emitter({ type: SUBSCRIBE_ERROR, error });
                emitter(END);
            })
            .on('changed', (log: Log) => {
                emitter({ type: SUBSCRIBE_CHANGED, log });
            });
        // The subscriber must return an unsubscribe function
        return () => {
            subscription.unsubscribe();
        };
    });
}

function* subscribeLogs(action: SubscribeLogsAction) {
    try {
        const { payload } = action;
        const { networkId, address, topics } = payload;

        const network = yield* select(selectNetwork, networkId);
        if (!network) throw new Error(`Network ${networkId} undefined`);

        if (!network.web3 && !network.web3Sender) throw new Error(`Network ${networkId} missing web3 or web3Sender`);
        const web3 = network.web3 ?? network.web3Sender!;

        const subscription = web3.eth.subscribe('logs', { address, topics });
        const channel: TakeableChannel<SubscribeLogsChannelMessage> = yield* call(subscribeLogsChannel, subscription);

        while (true) {
            const message: SubscribeLogsChannelMessage = yield* take(channel);
            const { type, log, error } = message;
            if (type === SUBSCRIBE_DATA && log) {
                yield* put(
                    createEvent({
                        ...log,
                        networkId,
                    }),
                );
            } else if (type === SUBSCRIBE_ERROR) {
                yield* put({ type: SUBSCRIBE_ERROR, error });
            } else if (type === SUBSCRIBE_CHANGED && log) {
                yield* put(
                    createEvent({
                        ...log,
                        networkId,
                    }),
                );
            }
        }
    } catch (error) {
        console.error(error);
        yield* put({ type: SUBSCRIBE_ERROR, error });
    } finally {
        yield* put({ type: SUBSCRIBE_DONE });
    }
}

function* subscribeLogsLoop() {
    const subscribed: { [key: string]: boolean } = {};
    const tasks: { [key: string]: any } = {};
    const pattern = (action: { type: string }) => {
        return isSubscribeLogsAction(action) || isUnsubscribeLogsAction(action);
    };

    while (true) {
        const action: Action<SubscribeLogsAction['type'] | UnsubscribeLogsAction['type']> = yield* take(pattern);
        if (isSubscribeLogsAction(action)) {
            const { payload } = action;
            //Only one active subscription per event per filter
            const subscriptionId = getLogsSubscriptionId(payload);
            if (!subscribed[subscriptionId]) {
                subscribed[subscriptionId] = true;
                //@ts-ignore
                tasks[subscriptionId] = yield* fork(subscribeLogs, action);
            }
        } else if (isUnsubscribeLogsAction(action)) {
            const { payload } = action;
            const subscriptionId = getLogsSubscriptionId(payload);
            if (subscribed[subscriptionId]) {
                subscribed[subscriptionId] = false;
                yield* cancel(tasks[subscriptionId]);
            }
        }
    }
}

export default subscribeLogsLoop;
