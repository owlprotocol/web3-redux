import { select, put, call } from 'typed-redux-saga';
import { create as createError } from '../../error/actions/index.js';
import NetworkCRUD from '../../network/crud.js';
import { isHexStrict } from '../../utils/web3-utils/index.js';
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

        const paramIsNumber = !isHexStrict(blockHashOrBlockNumber);
        let blockExists = false;
        if (paramIsNumber) {
            //Get block number
            const paramAsNumber =
                typeof blockHashOrBlockNumber === 'number' ? blockHashOrBlockNumber : parseInt(blockHashOrBlockNumber);
            //Check if block exists
            const block = yield* call(BlockCRUD.db.get, { networkId, number: paramAsNumber });
            if (!block) {
                yield* put(
                    BlockCRUD.actions.create(
                        {
                            networkId,
                            number: paramAsNumber,
                        },
                        action.meta.uuid,
                    ),
                );
            }
            blockExists = true;
        }

        //TODO: Handle existing by blockhash

        const result = yield* call(
            web3.eth.getBlock,
            blockHashOrBlockNumber,
            returnTransactionObjects ?? false, //default to false
        );
        if (blockExists) {
            yield* put(BlockCRUD.actions.update({ ...result, networkId }, action.meta.uuid));
        } else {
            //User passed blockHash as arg so we create the block only once data is passed
            yield* put(BlockCRUD.actions.create({ ...result, networkId }, action.meta.uuid));
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
                    type: GET_BLOCK_ERROR,
                },
                action.meta.uuid,
            ),
        );
    }
}

export default fetchSaga;
