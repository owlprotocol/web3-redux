import { put, call } from 'typed-redux-saga';
import { GetCodeAction } from '../actions/index.js';
import ContractCRUD from '../crud.js';
import loadNetwork from '../../network/sagas/loadNetwork.js';
import createError from '../../error/actions/create.js';

/** @category Sagas */
export function* getCode(action: GetCodeAction) {
    try {
        const { payload } = action;
        const { networkId, address } = payload;

        const network = yield* call(loadNetwork, networkId);
        if (!network) throw new Error(`Network ${networkId} undefined`);

        const web3 = network.web3 ?? network.web3Sender;
        if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

        //@ts-expect-error
        const code: string = yield* call((web3 ?? web3Sender).eth.getCode, address);
        yield* put(ContractCRUD.actions.upsert({ networkId, address, code }));
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

export default getCode;
