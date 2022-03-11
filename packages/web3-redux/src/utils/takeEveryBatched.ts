import { AnyAction } from 'redux';
import { BatchAction } from 'redux-batched-actions';
import { take, fork } from 'typed-redux-saga';

//https://typed-redux-saga.js.org/docs/api#takeeverypattern-saga-args
//A modified version of takeEvery to support actions sent with typed-redux-saga-batch
//Pattern is matched against batch name and assumes all child actions match pattern
const takeEveryBatched = (patternOrChannel: any, saga: any, ...args: any[]) =>
    fork(function* () {
        while (true) {
            const action: AnyAction = yield* take(patternOrChannel);
            if (action.meta && action.meta.batch) {
                for (const a of (action as BatchAction).payload) {
                    yield* fork(saga, ...args.concat(a));
                }
            } else {
                yield* fork(saga, ...args.concat(action));
            }
        }
    });

export default takeEveryBatched;
