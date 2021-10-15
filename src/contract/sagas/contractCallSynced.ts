import { put, call } from 'redux-saga/effects';
import { ZERO_ADDRESS } from '../../utils';
import {
    callArgsHash,
    CALL_BLOCK_SYNC,
    CALL_TRANSACTION_SYNC,
    ContractCallSync,
    defaultBlockSync,
    defaultTransactionSyncForContract,
} from '../model';
import { create, call as callAction, CallSyncedAction, CALL_SYNCED } from '../actions';
import contractExists from './contractExists';
import networkExists from '../../network/sagas/networkExists';

const CALL_SYNCED_ERROR = `${CALL_SYNCED}/ERROR`;

function* contractCallSynced(action: CallSyncedAction) {
    try {
        const { payload } = action;
        const { networkId, address } = payload;

        //@ts-ignore
        yield call(networkExists, networkId);
        //@ts-ignore
        const contract: Contract = yield call(contractExists, networkId, address);

        //Defaults
        const from: string = payload.from ?? ZERO_ADDRESS;
        const defaultBlock = payload.defaultBlock ?? 'latest';

        let sync: ContractCallSync | false;
        const defaultTransactionSync = defaultTransactionSyncForContract(contract.address);

        if (defaultBlock === 'latest') {
            if (payload.sync === false) {
                sync = false;
            } else if (payload.sync === true) {
                sync = defaultTransactionSync;
            } else if (!payload.sync) {
                sync = defaultTransactionSync;
            } else if (payload.sync === CALL_TRANSACTION_SYNC) {
                sync = defaultTransactionSync;
            } else if (payload.sync === CALL_BLOCK_SYNC) {
                sync = defaultBlockSync;
            } else {
                sync = payload.sync as ContractCallSync;
            }
        } else {
            sync = false;
        }

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
