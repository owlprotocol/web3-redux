import { put, call, all, takeEvery } from 'typed-redux-saga';
import { UpdateBatchedAction, UPDATE_BATCHED } from '../../actions/index.js';
import getDB from '../../../db.js';
import { create as createError } from '../../../error/actions/index.js';

const UPDATE_DB_BATCHED_ERROR = `${UPDATE_BATCHED}/ERROR`;

/** Handle async db action */
export function* updateDBBatchedSaga(action: UpdateBatchedAction) {
    try {
        const { payload } = action;

        const db = getDB();
        yield* call([db.transactions, db.transactions.bulkPut], payload);
    } catch (error) {
        //Errors thrown at tx encoding, most likely invalid ABI (function name, paremeters...)
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                errorMessage: (error as Error).message,
                type: UPDATE_DB_BATCHED_ERROR,
            }),
        );
    }
}

export function* watchUpdateDBBatchedSaga() {
    yield* all([takeEvery(UPDATE_BATCHED, updateDBBatchedSaga)]);
}

export default watchUpdateDBBatchedSaga;
