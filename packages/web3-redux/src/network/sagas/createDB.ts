import { put, call, all, takeEvery } from 'typed-redux-saga';
import { createDBAction, CreateAction, CreateDBAction, CREATE, CREATE_DB } from '../actions/index.js';
import db from '../../db.js';
import { name } from '../common.js';

/** Handle async db action */
export function* createDBSaga(action: CreateDBAction) {
    const { payload } = action;

    const models = yield* call([db, db.connect]);
    yield* call([models[name], models[name].create], payload);
}

/** Put async db action */
export function* putCreateDBSAga(action: CreateAction) {
    yield* put(createDBAction(action.payload, action.meta.uuid));
}

export function* watchCreateDBSaga() {
    yield* all([takeEvery(CREATE, putCreateDBSAga), takeEvery(CREATE_DB, createDBSaga)]);
}

export default watchCreateDBSaga;
