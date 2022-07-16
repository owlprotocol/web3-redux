import { put, call } from 'typed-redux-saga';
import { GetNonceAction } from '../actions/index.js';
import ContractCRUD from '../crud.js';
import loadNetwork from '../../network/sagas/loadNetwork.js';
import createError from '../../error/actions/create.js';

/** @category Sagas */
export function* getNonce(action: GetNonceAction) {
    try {
        const { payload } = action;
        const { networkId, address } = payload;

        const network = yield* call(loadNetwork, networkId);
        if (!network) throw new Error(`Network ${networkId} undefined`);

        const web3 = network.web3 ?? network.web3Sender;
        if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

        //@ts-expect-error
        const nonce: string = yield* call(web3.eth.getTransactionCount, address);
        yield* put(ContractCRUD.actions.upsert({ networkId, address, nonce: parseInt(nonce) }, action.meta.uuid));
    } catch (error) {
        yield* put(
            createError(
                {
                    id: action.meta.uuid,
                    errorMessage: (error as Error).message,
                    stack: (error as Error).stack,
                    type: action.type,
                },
                action.meta.uuid,
            ),
        );
    }
}

export default getNonce;
