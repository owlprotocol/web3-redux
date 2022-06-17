import { put, call, all, takeEvery } from 'typed-redux-saga';
import {
    createDBBatchedAction,
    CreateBatchedAction,
    CreateDBBatchedAction,
    CREATE_BATCHED,
    CREATE_DB_BATCHED,
} from '../../actions/index.js';
import getDB from '../../../db.js';
import { name } from '../../common.js';
import { create as createError } from '../../../error/actions/index.js';

const CREATE_DB_BATCHED_ERROR = `${CREATE_DB_BATCHED}/ERROR`;

/** Handle async db action */
export function* createDBBatchedSaga(action: CreateDBBatchedAction) {
    try {
        const { payload } = action;

        const db = yield* call(getDB);
        const models = yield* call([db, db.connect]);
        yield* call([models[name], models[name].createMultiple], payload);
    } catch (error) {
        //Errors thrown at tx encoding, most likely invalid ABI (function name, paremeters...)
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                errorMessage: (error as Error).message,
                type: CREATE_DB_BATCHED_ERROR,
            }),
        );
    }
}

/** Put async db action */
export function* putCreateDBBatchedSaga(action: CreateBatchedAction) {
    yield* put(createDBBatchedAction(action.payload, action.meta.uuid));
}

export function* watchCreateDBBatchedSaga() {
    yield* all([takeEvery(CREATE_BATCHED, putCreateDBBatchedSaga), takeEvery(CREATE_DB_BATCHED, createDBBatchedSaga)]);
}

export default watchCreateDBBatchedSaga;
