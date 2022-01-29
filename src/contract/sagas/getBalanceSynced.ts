import { put } from 'typed-redux-saga/macro';
import { create as createSync } from '../../sync/actions';
import { GetBalanceSyncedAction, GET_BALANCE_SYNCED } from '../actions/getBalanceSynced';

/** @internal */
const GET_BALANCE_SYNCED_ERROR = `${GET_BALANCE_SYNCED}/ERROR`;

/** @category Sagas */
function* getBalanceSynced(action: GetBalanceSyncedAction) {
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
            type: GET_BALANCE_SYNCED_ERROR,
            error,
            action,
        });
    }
}

export default getBalanceSynced;
