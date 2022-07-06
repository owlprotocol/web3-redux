import { put, call, all, takeEvery } from 'typed-redux-saga';
import { CreateBatchedAction, CREATE_BATCHED } from '../../actions/index.js';
import getDB from '../../../db.js';
import { create as createError } from '../../../error/actions/index.js';

const CREATE_DB_BATCHED_ERROR = `${CREATE_BATCHED}/ERROR`;

/** Handle async db action */
export function* createDBBatchedSaga(action: CreateBatchedAction) {
    try {
        const { payload } = action;

        const db = getDB();
        yield* call([db.contracts, db.contracts.bulkAdd], payload);
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

export function* watchCreateDBBatchedSaga() {
    yield* all([takeEvery(CREATE_BATCHED, createDBBatchedSaga)]);
}

export default watchCreateDBBatchedSaga;
