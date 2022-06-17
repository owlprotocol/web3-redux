import { put, call, all, takeEvery } from 'typed-redux-saga';
// eslint-disable-next-line import/no-unresolved
import { TransactionModes } from 'indexeddb-orm';
import {
    removeDBBatchedAction,
    RemoveBatchedAction,
    RemoveDBBatchedAction,
    REMOVE_BATCHED,
    REMOVE_DB_BATCHED,
} from '../../actions/index.js';
import getDB from '../../../db.js';
import { name } from '../../common.js';
import { create as createError } from '../../../error/actions/index.js';

const REMOVE_DB_BATCHED_ERROR = `${REMOVE_DB_BATCHED}/ERROR`;

/** Handle async db action */
export function* removeDBBatchedSaga(action: RemoveDBBatchedAction) {
    try {
        const { payload } = action;

        const db = yield* call(getDB);
        const models = yield* call([db, db.connect]);
        const { models: transactionModels } = yield* call(
            [models[name], models[name].openTransaction],
            TransactionModes.Write,
        );

        const tasks = payload.map((t) => {
            return call([transactionModels[name], transactionModels[name].delete], t); //deep-merge
        });

        yield* all(tasks); //Wait for all removes to complete
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

/** Put async db action */
export function* putRemoveDBBatchedSaga(action: RemoveBatchedAction) {
    yield* put(removeDBBatchedAction(action.payload, action.meta.uuid));
}

export function* watchRemoveDBBatchedSaga() {
    yield* all([takeEvery(REMOVE_BATCHED, putRemoveDBBatchedSaga), takeEvery(REMOVE_DB_BATCHED, removeDBBatchedSaga)]);
}

export default watchRemoveDBBatchedSaga;
