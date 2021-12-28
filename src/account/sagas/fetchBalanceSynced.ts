import { put } from 'typed-redux-saga/macro';
import { create as createSync } from '../../sync/actions';
import { FetchBalanceSyncedAction, FETCH_BALANCE_SYNCED } from '../actions/fetchBalanceSynced';

/** @internal */
const FETCH_BALANCE_SYNCED_ERROR = `${FETCH_BALANCE_SYNCED}/ERROR`;

/** @category Sagas */
function* fetchBalanceSynced(action: FetchBalanceSyncedAction) {
    try {
        const { payload } = action;
        const { sync, fetchBalanceAction } = payload;

        //Initial Action
        yield* put(fetchBalanceAction);
        //Create Sync
        if (sync) {
            yield* put(createSync(sync));
        }
    } catch (error) {
        console.error(error);
        yield* put({
            type: FETCH_BALANCE_SYNCED_ERROR,
            error,
            action,
        });
    }
}

export default fetchBalanceSynced;
