import { put, call, all, takeEvery } from 'typed-redux-saga';
// eslint-disable-next-line import/no-unresolved
import { TransactionModes } from 'indexeddb-orm';
import {
    updateDBBatchedAction,
    UpdateBatchedAction,
    UpdateDBBatchedAction,
    UPDATE_BATCHED,
    UPDATE_DB_BATCHED,
} from '../../actions/index.js';
import getDB from '../../../db.js';
import { name } from '../../common.js';
import { create as createError } from '../../../error/actions/index.js';

const UPDATE_DB_BATCHED_ERROR = `${UPDATE_DB_BATCHED}/ERROR`;

/** Handle async db action */
export function* updateDBBatchedSaga(action: UpdateDBBatchedAction) {
    try {
        const { payload } = action;

        const db = yield* call(getDB);
        const models = yield* call([db, db.connect]);
        const { models: transactionModels } = yield* call(
            [models[name], models[name].openTransaction],
            TransactionModes.Write,
        );

        const tasks = payload.map((t) => {
            return call([transactionModels[name], transactionModels[name].save], t.networkId, t, true); //deep-merge
        });

        yield* all(tasks); //Wait for all updates to complete
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

/** Put async db action */
export function* putUpdateDBBatchedSaga(action: UpdateBatchedAction) {
    yield* put(updateDBBatchedAction(action.payload, action.meta.uuid));
}

export function* watchUpdateDBBatchedSaga() {
    yield* all([takeEvery(UPDATE_BATCHED, putUpdateDBBatchedSaga), takeEvery(UPDATE_DB_BATCHED, updateDBBatchedSaga)]);
}

export default watchUpdateDBBatchedSaga;
