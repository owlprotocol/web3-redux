import { put, call, all, takeEvery } from 'typed-redux-saga';
import { RemoveAction, REMOVE } from '../../actions/index.js';
import getDB from '../../../db.js';
import { create as createError } from '../../../error/actions/index.js';

const REMOVE_DB_ERROR = `${REMOVE}/ERROR`;
/** Handle async db action */
export function* removeDBSaga(action: RemoveAction) {
    try {
        const { payload } = action;

        const db = getDB();
        yield* call([db.blocks, db.blocks.delete], [payload.networkId, payload.number]);
    } catch (error) {
        //Errors thrown at tx encoding, most likely invalid ABI (function name, paremeters...)
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                errorMessage: (error as Error).message,
                type: REMOVE_DB_ERROR,
            }),
        );
    }
}

export function* watchRemoveDBSaga() {
    yield* all([takeEvery(REMOVE, removeDBSaga)]);
}

export default watchRemoveDBSaga;
