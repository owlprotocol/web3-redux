import { select, put, call } from 'typed-redux-saga';
import getDB from '../../db.js';
import NetworkCRUD from '../../network/crud.js';
import { isHexStrict } from '../../utils/web3-utils/index.js';
import { FetchAction } from '../actions/index.js';
import BlockCRUD from '../crud.js';
import { validateId } from '../model/interface.js';

/** @category Sagas */
export function* fetchSaga(action: FetchAction) {
    const { payload } = action;
    const { networkId, blockHashOrBlockNumber, returnTransactionObjects } = payload;

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

    const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, { networkId });
    const web3 = network?.web3 ?? network?.web3Sender;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

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
}

export default fetchSaga;
