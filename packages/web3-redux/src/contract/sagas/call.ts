import { put, call } from 'typed-redux-saga/macro';

import exists from './exists.js';
import networkExists from '../../network/sagas/exists.js';
import { validateEthCall, getEthCallIdArgs } from '../../ethcall/model/index.js';
import { create as createEthCall, set as setEthCall } from '../../ethcall/actions/index.js';

import { getId } from '../model/index.js';
import { CallAction, CALL } from '../actions/index.js';

const CALL_ERROR = `${CALL}/ERROR`;

export function* callSaga(action: CallAction) {
    try {
        const { payload } = action;
        const { networkId, address, from, defaultBlock } = payload;

        yield* call(networkExists, networkId);
        const contract = yield* call(exists, { networkId, address });

        const web3Contract = contract.web3Contract ?? contract.web3SenderContract;
        if (!web3Contract) {
            const error = new Error(`Contract ${getId(payload)} has no web3 contract`);
            console.error(error);
            yield* put({
                type: CALL_ERROR,
                error,
                errorMessage: (error as Error).message,
                action,
            });
            return;
        }

        const method = web3Contract.methods[payload.method];
        if (!method) {
            const error = new Error(`Contract ${getId(payload)} no such method ${payload.method}`);
            console.error(error);
            yield* put({
                type: CALL_ERROR,
                error,
                errorMessage: (error as Error).message,
                action,
            });
            return;
        }

        let tx: any;
        if (!payload.args || payload.args.length == 0) tx = method();
        else tx = method(...payload.args);
        const data = tx.encodeABI();

        const ethCall = validateEthCall({
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
        yield* put(setEthCall({ id: getEthCallIdArgs(ethCall), key: 'returnValue', value: returnValue }));
    } catch (error) {
        console.error(error);
        yield* put({
            type: CALL_ERROR,
            error,
            errorMessage: (error as Error).message,
            action,
        });
    }
}

export default callSaga;
