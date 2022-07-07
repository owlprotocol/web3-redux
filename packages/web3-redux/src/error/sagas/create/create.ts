import { call, all, takeEvery } from 'typed-redux-saga';
import { CreateAction, CREATE } from '../../actions/index.js';
import getDB from '../../../db.js';

/** Handle async db action */
export function* createSaga(action: CreateAction) {
    const { payload } = action;

    const db = getDB();
    yield* call([db.errors, db.errors.add], payload);
}

export function* watchCreateDBSaga() {
    yield* all([takeEvery(CREATE, createSaga)]);
}

export default watchCreateDBSaga;
