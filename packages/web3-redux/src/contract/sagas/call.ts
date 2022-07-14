import { put, call, select, takeEvery } from 'typed-redux-saga';
import { create as createError } from '../../error/actions/index.js';

import { CallAction, CALL } from '../actions/index.js';
//import takeEveryBuffered from '../../sagas/takeEveryBuffered.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';
import EthCallCRUD from '../../ethcall/crud.js';
import { NonPayableTransactionObject } from '../../typechain/types.js';

const CALL_ERROR = `${CALL}/ERROR`;

export function* callSaga(action: CallAction) {
    try {
        const { payload } = action;
        const { networkId, address, args, ifnull } = payload;
        //Make sure required parameters defined
        if (!networkId) throw new Error('networkId undefined');
        if (!address) throw new Error('address undefined');
        if (!payload.method) throw new Error('method undefined');

        const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, { networkId });
        if (!network) throw new Error(`Network ${networkId} undefined`);

        const contract = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
        if (!contract) throw new Error(`Contract ${ContractCRUD.validateId({ networkId, address })} undefined`);

        const web3Contract = contract.web3Contract ?? contract.web3SenderContract;
        if (!web3Contract)
            throw new Error(`Contract ${ContractCRUD.validateId({ networkId, address })} has no web3 contract`);

        const method = web3Contract.methods[payload.method];
        if (!method)
            throw new Error(`Contract ${ContractCRUD.validateId(payload)} has no such method ${payload.method}`);

        let tx: NonPayableTransactionObject<any>;
        if (!args || args.length == 0) tx = method();
        else tx = method(...args);
        const data = tx.encodeABI();
        const ethCall = EthCallCRUD.validate({
            networkId,
            to: contract.address,
            data,
        });

        try {
            //Cached call
            const existingEthCall = yield* call(EthCallCRUD.db.get, { networkId, to: contract.address, data });
            if (!ifnull || (ifnull && !existingEthCall)) {
                //Refresh data
                if (!existingEthCall) {
                    //Tx Encodable, any errors are execution related
                    //Create base call
                    yield* put(EthCallCRUD.actions.create({ ...ethCall, status: 'LOADING' }, action.meta.uuid));
                } else {
                    yield* put(
                        EthCallCRUD.actions.update(
                            { networkId, to: contract.address, data, status: 'LOADING' },
                            action.meta.uuid,
                        ),
                    );
                }

                const gas = yield* call(tx.estimateGas);
                const returnValue = yield* call(tx.call, { gas });
                const timestamp = Date.now();
                yield* put(
                    EthCallCRUD.actions.update(
                        { ...ethCall, returnValue, status: 'SUCCESS', lastUpdated: timestamp },
                        action.meta.uuid,
                    ),
                );
            }
        } catch (error) {
            const timestamp = Date.now();
            yield* put(
                EthCallCRUD.actions.update(
                    { ...ethCall, status: 'ERROR', errorId: action.meta.uuid, lastUpdated: timestamp },
                    action.meta.uuid,
                ),
            );
            throw error;
        }
    } catch (error) {
        //Errors thrown at tx encoding, most likely invalid ABI (function name, paremeters...)
        const err = error as Error;
        yield* put(
            createError(
                {
                    id: action.meta.uuid,
                    errorMessage: err.message,
                    stack: err.stack,
                    type: CALL_ERROR,
                },
                action.meta.uuid,
            ),
        );
    }
}

export function* watchCallSaga() {
    yield* takeEvery(CALL, callSaga);
    /*
    yield takeEveryBuffered(CALL, callSaga, {
        bufferSize: 10,
        bufferBatchTimeout: 200,
        bufferCompletionTimeout: 1000,
    });
    */
}

export default watchCallSaga;
