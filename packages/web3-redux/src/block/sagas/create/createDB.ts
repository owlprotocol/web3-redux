import { put, call, all, takeEvery } from 'typed-redux-saga';
import { createDBAction, CreateAction, CreateDBAction, CREATE, CREATE_DB } from '../../actions/index.js';
import getDB from '../../../db.js';
import { name } from '../../common.js';
import { create as createError } from '../../../error/actions/index.js';

const CREATE_DB_ERROR = `${CREATE_DB}/ERROR`;
/** Handle async db action */
export function* createDBSaga(action: CreateDBAction) {
    try {
        const { payload } = action;

        const db = yield* call(getDB);
        const models = yield* call([db, db.connect]);
        yield* call([models[name], models[name].create], payload);
    } catch (error) {
        //Errors thrown at tx encoding, most likely invalid ABI (function name, paremeters...)
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                errorMessage: (error as Error).message,
                type: CREATE_DB_ERROR,
            }),
        );
    }
}

/** Put async db action */
export function* putCreateDBSaga(action: CreateAction) {
    yield* put(createDBAction(action.payload, action.meta.uuid));
}

export function* watchCreateDBSaga() {
    yield* all([takeEvery(CREATE, putCreateDBSaga), takeEvery(CREATE_DB, createDBSaga)]);
}

export default watchCreateDBSaga;
