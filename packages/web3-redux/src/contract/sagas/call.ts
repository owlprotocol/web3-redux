import { put, call, select } from 'typed-redux-saga';
import { selectByIdSingle as selectNetwork } from '../../network/selectors/index.js';
import { validateEthCall } from '../../ethcall/model/index.js';
import { createAction as createEthCall, updateAction as updateEthCall } from '../../ethcall/actions/index.js';
import { create as createError } from '../../error/actions/index.js';

import { getId } from '../model/index.js';
import { CallAction, CALL } from '../actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';
import takeEveryBuffered from '../../sagas/takeEveryBuffered.js';

const CALL_ERROR = `${CALL}/ERROR`;

export function* callSaga(action: CallAction) {
    try {
        const { payload } = action;
        const { networkId, address, args, from, defaultBlock } = payload;
        //Make sure required parameters defined
        if (!networkId) throw new Error('networkId undefined');
        if (!address) throw new Error('address undefined');
        if (!payload.method) throw new Error('method undefined');

        const network = yield* select(selectNetwork, networkId);
        if (!network) throw new Error(`Network ${networkId} undefined`);

        const contract = yield* select(selectByIdSingle, { networkId, address });
        if (!contract) throw new Error(`Contract ${getId(payload)} undefined`);

        const web3Contract = contract.web3Contract ?? contract.web3SenderContract;
        if (!web3Contract) throw new Error(`Contract ${getId(payload)} has no web3 contract`);

        const method = web3Contract.methods[payload.method];
        if (!method) throw new Error(`Contract ${getId(payload)} has no such method ${payload.method}`);

        let tx: any;
        if (!args || args.length == 0) tx = method();
        else tx = method(...args);
        const data = tx.encodeABI();
        const ethCall = validateEthCall({
            networkId,
            from,
            to: contract.address,
            defaultBlock,
            data,
        });

        try {
            //Tx Encodable, any errors are execution related
            //Create base call
            yield* put(createEthCall({ ...ethCall, status: 'LOADING' }, action.meta.uuid));
            const gas = ethCall.gas ?? (yield* call(tx.estimateGas, { ...ethCall })); //default gas
            //@ts-ignore
            const returnValue = yield* call(tx.call, { ...ethCall, gas }, ethCall.defaultBlock);
            const timestamp = Date.now();
            yield* put(
                updateEthCall(
                    { ...ethCall, error: undefined, returnValue, status: 'SUCCESS', lastUpdated: timestamp },
                    action.meta.uuid,
                ),
            );
        } catch (error) {
            const timestamp = Date.now();
            yield* put(
                updateEthCall(
                    { ...ethCall, error: error as Error, status: 'ERROR', lastUpdated: timestamp },
                    action.meta.uuid,
                ),
            );
            yield* put(
                createError({
                    id: action.meta.uuid,
                    error: error as Error,
                    errorMessage: (error as Error).message,
                    type: CALL_ERROR,
                }),
            );
        }
    } catch (error) {
        //Errors thrown at tx encoding, most likely invalid ABI (function name, paremeters...)
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                errorMessage: (error as Error).message,
                type: CALL_ERROR,
            }),
        );
    }
}

export function* watchCallSaga() {
    yield takeEveryBuffered(CALL, callSaga, {
        bufferSize: 10,
        bufferBatchTimeout: 200,
        bufferCompletionTimeout: 1000,
    });
}

export default watchCallSaga;
