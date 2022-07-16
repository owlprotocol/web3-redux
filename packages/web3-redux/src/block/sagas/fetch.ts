import { select, put, call } from 'typed-redux-saga';
import { create as createError } from '../../error/actions/index.js';
import NetworkCRUD from '../../network/crud.js';
import { FETCH, FetchAction } from '../actions/index.js';
import BlockCRUD from '../crud.js';

const GET_BLOCK_ERROR = `${FETCH}/ERROR`;
/** @category Sagas */
export function* fetchSaga(action: FetchAction) {
    try {
        const { payload } = action;
        const { networkId, blockHashOrBlockNumber, returnTransactionObjects } = payload;

        const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
        const web3 = network?.web3 ?? network?.web3Sender;
        if (!web3) throw new Error(`Network ${networkId} missing web3`);

        const result = yield* call(
            web3.eth.getBlock,
            blockHashOrBlockNumber,
            returnTransactionObjects ?? false, //default to false
        );
        yield* put(BlockCRUD.actions.put({ ...result, networkId }, action.meta.uuid));
    } catch (error) {
        //Errors thrown at tx encoding, most likely invalid ABI (function name, paremeters...)
        const err = error as Error;
        yield* put(
            createError(
                {
                    id: action.meta.uuid,
                    errorMessage: err.message,
                    stack: err.stack,
                    type: GET_BLOCK_ERROR,
                },
                action.meta.uuid,
            ),
        );
    }
}

export default fetchSaga;
