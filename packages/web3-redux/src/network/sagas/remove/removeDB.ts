import { put, call, all, takeEvery } from 'typed-redux-saga';
import { removeDBAction, RemoveAction, RemoveDBAction, REMOVE, REMOVE_DB } from '../../actions/index.js';
import getDB from '../../../db.js';
import { name } from '../../common.js';
import { create as createError } from '../../../error/actions/index.js';

const REMOVE_DB_ERROR = `${REMOVE_DB}/ERROR`;
/** Handle async db action */
export function* removeDBSaga(action: RemoveDBAction) {
    try {
        const { payload } = action;

        const db = yield* call(getDB);
        const models = yield* call([db, db.connect]);
        yield* call([models[name], models[name].delete], payload.networkId); //deep-merge
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

/** Put async db action */
export function* putRemoveDBSAga(action: RemoveAction) {
    yield* put(removeDBAction(action.payload, action.meta.uuid));
}

export function* watchRemoveDBSaga() {
    yield* all([takeEvery(REMOVE, putRemoveDBSAga), takeEvery(REMOVE_DB, removeDBSaga)]);
}

export default watchRemoveDBSaga;
