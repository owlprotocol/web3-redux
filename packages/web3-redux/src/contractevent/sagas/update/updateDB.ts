import { put, call, all, takeEvery } from 'typed-redux-saga';
import { UpdateAction, UPDATE } from '../../actions/index.js';
import getDB from '../../../db.js';
import { create as createError } from '../../../error/actions/index.js';

const UPDATE_DB_ERROR = `${UPDATE}/ERROR`;
/** Handle async db action */
export function* updateDBSaga(action: UpdateAction) {
    try {
        const { payload } = action;

        const db = getDB();
        yield* call([db.contractEvents, db.contractEvents.put], payload);
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

export function* watchUpdateDBSaga() {
    yield* all([takeEvery(UPDATE, updateDBSaga)]);
}

export default watchUpdateDBSaga;
