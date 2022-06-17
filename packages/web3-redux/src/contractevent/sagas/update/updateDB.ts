import { put, call, all, takeEvery } from 'typed-redux-saga';
import { updateDBAction, UpdateAction, UpdateDBAction, UPDATE, UPDATE_DB } from '../../actions/index.js';
import getDB from '../../../db.js';
import { name } from '../../common.js';
import { create as createError } from '../../../error/actions/index.js';

const UPDATE_DB_ERROR = `${UPDATE_DB}/ERROR`;
/** Handle async db action */
export function* updateDBSaga(action: UpdateDBAction) {
    try {
        const { payload } = action;

        const db = yield* call(getDB);
        const models = yield* call([db, db.connect]);
        yield* call([models[name], models[name].save], payload.id, payload, true); //deep-merge
    } catch (error) {
        //Errors thrown at tx encoding, most likely invalid ABI (function name, paremeters...)
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                errorMessage: (error as Error).message,
                type: UPDATE_DB_ERROR,
            }),
        );
    }
}

/** Put async db action */
export function* putUpdateDBSaga(action: UpdateAction) {
    yield* put(updateDBAction(action.payload, action.meta.uuid));
}

export function* watchUpdateDBSaga() {
    yield* all([takeEvery(UPDATE, putUpdateDBSaga), takeEvery(UPDATE_DB, updateDBSaga)]);
}

export default watchUpdateDBSaga;
