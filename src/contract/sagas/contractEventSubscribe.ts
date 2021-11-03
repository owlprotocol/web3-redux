import { Action } from 'redux';
import { put, call, cancel, take, fork } from 'typed-redux-saga/macro';
import { EventChannel, eventChannel, END, TakeableChannel } from 'redux-saga';
import { Subscription } from 'web3-core-subscriptions';
import { EventData } from 'web3-eth-contract';
import { create as createEvent } from '../../contractevent/actions';
import { eventSubscriptionHash, getId } from '../model';
import {
    EventSubscribeAction,
    EventUnsubscribeAction,
    EVENT_SUBSCRIBE,
    isEventSubscribeAction,
    isEventUnsubscribeAction,
} from '../actions';
import networkExists from '../../network/sagas/exists';
import exists from './exists';

const SUBSCRIBE_DATA = `${EVENT_SUBSCRIBE}/DATA`;
const SUBSCRIBE_ERROR = `${EVENT_SUBSCRIBE}/ERROR`;
const SUBSCRIBE_CHANGED = `${EVENT_SUBSCRIBE}/CHANGED`;
const SUBSCRIBE_DONE = `${EVENT_SUBSCRIBE}/DONE`;
interface EventSubscribeChannelMessage {
    type: typeof SUBSCRIBE_DATA | typeof SUBSCRIBE_ERROR | typeof SUBSCRIBE_CHANGED;
    error?: any;
    event?: EventData;
}

function eventSubscribeChannel(subscription: Subscription<EventData>): EventChannel<EventSubscribeChannelMessage> {
    return eventChannel((emitter) => {
        subscription
            .on('data', (event: EventData) => {
                emitter({ type: SUBSCRIBE_DATA, event });
            })
            .on('error', (error: any) => {
                emitter({ type: SUBSCRIBE_ERROR, error });
                emitter(END);
            })
            .on('changed', (event: EventData) => {
                emitter({ type: SUBSCRIBE_CHANGED, event });
            });
        // The subscriber must return an unsubscribe function
        return () => {
            subscription.unsubscribe();
        };
    });
}

function* eventSubscribe(action: EventSubscribeAction) {
    try {
        const { payload } = action;
        const { networkId, address, eventName } = payload;
        const id = getId({ networkId, address });

        //@ts-ignore
        yield* call(networkExists, networkId);
        //@ts-ignore
        const contract: Contract = yield* call(exists, id);

        const web3Contract = contract.web3Contract!;
        const filter = payload.filter ?? {};
        const subscription = web3Contract.events[eventName]({ filter });
        const channel: TakeableChannel<EventSubscribeChannelMessage> = yield* call(eventSubscribeChannel, subscription);

        while (true) {
            const message: EventSubscribeChannelMessage = yield* take(channel);
            const { type, event, error } = message;
            if (type === SUBSCRIBE_DATA && event) {
                yield* put(
                    createEvent({
                        ...event,
                        networkId,
                        address,
                        name: eventName,
                    }),
                );
            } else if (type === SUBSCRIBE_ERROR) {
                yield* put({ type: SUBSCRIBE_ERROR, error });
            } else if (type === SUBSCRIBE_CHANGED && event) {
                yield* put(
                    createEvent({
                        ...event,
                        networkId,
                        address,
                        name: eventName,
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

function* eventSubscribeLoop() {
    const subscribed: { [key: string]: boolean } = {};
    const tasks: { [key: string]: any } = {};
    const pattern = (action: { type: string }) => {
        return isEventSubscribeAction(action) || isEventUnsubscribeAction(action);
    };

    while (true) {
        const action: Action<EventSubscribeAction['type'] | EventUnsubscribeAction['type']> = yield* take(pattern);
        if (isEventSubscribeAction(action)) {
            const { payload } = action;
            //Only one active subscription per event per filter
            const eventId = eventSubscriptionHash(payload);
            if (!subscribed[eventId]) {
                subscribed[eventId] = true;
                //@ts-ignore
                tasks[eventId] = yield* fork(eventSubscribe, action);
            }
        } else if (isEventUnsubscribeAction(action)) {
            const { payload } = action;
            const eventId = eventSubscriptionHash(payload);
            if (subscribed[eventId]) {
                subscribed[eventId] = false;
                yield* cancel(tasks[eventId]);
            }
        }
    }
}

export default eventSubscribeLoop;
