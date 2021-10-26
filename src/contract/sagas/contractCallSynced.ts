import { put, call } from 'redux-saga/effects';
import { callArgsHash } from '../model';
import { create, call as callAction, CallSyncedAction, CALL_SYNCED } from '../actions';
import contractExists from './contractExists';
import networkExists from '../../network/sagas/networkExists';

const CALL_SYNCED_ERROR = `${CALL_SYNCED}/ERROR`;

function* contractCallSynced(action: CallSyncedAction) {
    try {
        const { payload } = action;
        const { networkId, address, from, defaultBlock, sync } = payload;

        //@ts-ignore
        yield call(networkExists, networkId);
        //@ts-ignore
        const contract: Contract = yield call(contractExists, networkId, address);

        //Update contract call sync
        const key = callArgsHash({ from, defaultBlock, args: payload.args });
        const contractCallSync = contract.methods[payload.method][key];
        if (!contractCallSync) {
            contract.methods[payload.method][key] = { sync };
            yield put(create({ ...contract }));
            yield put(callAction(payload));
        } else if (contractCallSync.sync != sync) {
            contract.methods[payload.method][key].sync = sync;
            yield put(create({ ...contract }));
            yield put(callAction(payload));
        }
    } catch (error) {
        console.error(error);
        yield put({
            type: CALL_SYNCED_ERROR,
            error,
            action,
        });
    }
}

export default contractCallSynced;
