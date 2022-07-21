import { put, call } from 'typed-redux-saga';
import { expectSaga } from 'redux-saga-test-plan';
import takeEveryBuffered from './takeEveryBuffered.js';
import { sleep } from '../utils/index.js';

const time = Date.now();
function* sleepSaga(action: any) {
    yield* call(sleep, action.payload);

    const completed = Date.now();
    console.debug(`${completed - time} - ${JSON.stringify(action)}`);
    yield put({ type: 'COMPLETE', payload: completed });
}

function* mainSaga() {
    yield* put({ type: 'START', payload: 100 });
    yield* put({ type: 'START', payload: 100 });
    yield* put({ type: 'START', payload: 100 });
    yield* put({ type: 'START', payload: 100 });
    yield* put({ type: 'START', payload: 100 });
    yield takeEveryBuffered('START', sleepSaga, { bufferSize: 2, bufferCompletionTimeout: 2000 });
}

describe('sagas/takeEveryBuffered.test.ts', () => {
    it('mainSaga()', async () => {
        expectSaga.DEFAULT_TIMEOUT = 1000;
        await expectSaga(mainSaga).run();
    });
});
