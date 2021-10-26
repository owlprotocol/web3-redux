import { put, call } from 'redux-saga/effects';
import { validatedEthCall } from '../../ethcall/model';
import { create as createEthCall } from '../../ethcall/actions';
import { callArgsHash } from '../model';
import { create, CallAction, CALL } from '../actions';
import contractExists from './contractExists';
import networkExists from '../../network/sagas/networkExists';

const CALL_ERROR = `${CALL}/ERROR`;

function* contractCall(action: CallAction) {
    try {
        const { payload } = action;
        const { networkId, address, from, defaultBlock } = payload;

        //@ts-ignore
        yield call(networkExists, networkId);
        //@ts-ignore
        const contract: Contract = yield call(contractExists, networkId, address);

        const web3Contract = contract.web3Contract!;
        let tx: any;
        if (!payload.args || payload.args.length == 0) {
            tx = web3Contract.methods[payload.method]();
        } else {
            tx = web3Contract.methods[payload.method](...payload.args);
        }
        const data = tx.encodeABI();

        const ethCall = validatedEthCall({
            networkId,
            from,
            to: contract.address,
            defaultBlock,
            data,
            gas: payload.gas,
        });

        //Create base call
        yield put(createEthCall(ethCall));

        //Update contract call key if not stored
        const key = callArgsHash({ from, defaultBlock, args: payload.args });
        const contractCallSync = contract.methods[payload.method][key];
        if (!contractCallSync) {
            contract.methods[payload.method][key] = { ethCallId: ethCall.id };
            yield put(create(contract));
        } else if (contractCallSync.ethCallId != ethCall.id) {
            contract.methods[payload.method][key].ethCallId = ethCall.id;
            yield put(create(contract));
        }

        const gas = ethCall.gas ?? (yield call(tx.estimateGas, { ...ethCall })); //default gas
        //@ts-ignore
        const returnValue = yield call(tx.call, { ...ethCall, gas }, ethCall.defaultBlock);
        yield put(createEthCall({ ...ethCall, returnValue }));
    } catch (error) {
        console.error(error);
        yield put({
            type: CALL_ERROR,
            error,
            action,
        });
    }
}

export default contractCall;
