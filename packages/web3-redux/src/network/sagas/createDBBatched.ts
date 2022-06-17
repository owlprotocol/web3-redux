import { put, call, all, takeEvery } from 'typed-redux-saga';
import {
    createDBBatchedAction,
    CreateBatchedAction,
    CreateDBBatchedAction,
    CREATE_BATCHED,
    CREATE_DB_BATCHED,
} from '../actions/index.js';
import getDB from '../../db.js';
import { name } from '../common.js';

/** Handle async db action */
export function* createDBBatchedSaga(action: CreateDBBatchedAction) {
    const { payload } = action;

    const db = yield* call(getDB);
    const models = yield* call([db, db.connect]);
    yield* call([models[name], models[name].createMultiple], payload);
}

/** Put async db action */
export function* putCreateDBBatchedSaga(action: CreateBatchedAction) {
    yield* put(createDBBatchedAction(action.payload, action.meta.uuid));
}

export function* watchCreateDBBatchedSaga() {
    yield* all([takeEvery(CREATE_BATCHED, putCreateDBBatchedSaga), takeEvery(CREATE_DB_BATCHED, createDBBatchedSaga)]);
}

export default watchCreateDBBatchedSaga;
