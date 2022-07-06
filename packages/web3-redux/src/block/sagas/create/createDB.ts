import { put, call, all, takeEvery } from 'typed-redux-saga';
import { CreateAction, CREATE } from '../../actions/index.js';
import getDB from '../../../db.js';
import { create as createError } from '../../../error/actions/index.js';

const CREATE_DB_ERROR = `${CREATE}/ERROR`;
/** Handle async db action */
export function* createDBSaga(action: CreateAction) {
    try {
        const { payload } = action;

        const db = getDB();
        yield* call([db.blocks, db.blocks.add], payload);
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

export function* watchCreateDBSaga() {
    yield* all([takeEvery(CREATE, createDBSaga)]);
}

export default watchCreateDBSaga;
