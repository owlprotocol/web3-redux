import { take, cancel } from 'typed-redux-saga/macro';
import { isSubscribeAction, isUnsubscribeAction } from '../actions';

function* subscribeLoop() {
    const subscribed: { [key: string]: boolean } = {};
    const tasks: { [key: string]: any } = {};

    const pattern = (action: { type: string }) => {
        return isSubscribeAction(action) || isUnsubscribeAction(action);
    };

    while (true) {
        const action = yield* take(pattern); // as SubscribeAction | UnsubscribeAction>;

        if (isSubscribeAction(action)) {
            const { payload } = action;
            const { networkId } = payload;

            if (!subscribed[networkId]) {
                //Only one active subscription per network
                //TODO: Allow editing of subscription params (auto-cancel)
                subscribed[networkId] = true;
                //@ts-ignore
                tasks[networkId] = yield* fork(subscribe, action);
            }
        } else if (isUnsubscribeAction(action)) {
            const { payload } = action;
            const networkId = payload;

            if (subscribed[networkId]) {
                subscribed[networkId] = false;
                yield* cancel(tasks[networkId]);
            }
        }
    }
}

export default subscribeLoop;
