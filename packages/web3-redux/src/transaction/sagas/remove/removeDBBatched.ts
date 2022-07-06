import { put, call, all, takeEvery } from 'typed-redux-saga';
import { RemoveBatchedAction, REMOVE_BATCHED } from '../../actions/index.js';
import getDB from '../../../db.js';
import { create as createError } from '../../../error/actions/index.js';

const REMOVE_DB_BATCHED_ERROR = `${REMOVE_BATCHED}/ERROR`;

/** Handle async db action */
export function* removeDBBatchedSaga(action: RemoveBatchedAction) {
    try {
        const { payload } = action;

        const db = getDB();
        yield* call(
            [db.transactions, db.transactions.bulkDelete],
            payload.map((p) => [p.networkId, p.hash]),
        );
    } catch (error) {
        //Errors thrown at tx encoding, most likely invalid ABI (function name, paremeters...)
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                errorMessage: (error as Error).message,
                type: REMOVE_DB_BATCHED_ERROR,
            }),
        );
    }
}

export function* watchRemoveDBBatchedSaga() {
    yield* all([takeEvery(REMOVE_BATCHED, removeDBBatchedSaga)]);
}

export default watchRemoveDBBatchedSaga;
