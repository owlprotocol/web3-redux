import { put, call } from 'typed-redux-saga/macro';

import networkExists from '../../network/sagas/exists';
import { validate as validatedEthCall } from '../../ethcall/model';
import { create as createEthCall, update as updateEthCall } from '../../ethcall/actions';

import { getId } from '../model';
import { CallAction, CALL } from '../actions';
import exists from './exists';

const CALL_ERROR = `${CALL}/ERROR`;

function* callSaga(action: CallAction) {
    try {
        const { payload } = action;
        const { networkId, address, from, defaultBlock } = payload;
        const id = getId({ networkId, address });

        yield* call(networkExists, networkId);
        const contract = yield* call(exists, id);

        const web3Contract = contract.web3Contract ?? contract.web3SenderContract;
        if (!web3Contract) throw new Error(`Contract ${id} has no web3 contract`);
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
        });

        //Create base call
        yield* put(createEthCall(ethCall));

        const gas = ethCall.gas ?? (yield* call(tx.estimateGas, { ...ethCall })); //default gas
        //@ts-ignore
        const returnValue = yield* call(tx.call, { ...ethCall, gas }, ethCall.defaultBlock);
        yield* put(updateEthCall({ ...ethCall, returnValue }));
    } catch (error) {
        console.error(error);
        yield* put({
            type: CALL_ERROR,
            error,
            action,
        });
    }
}

export default callSaga;
