import { select, put, call } from 'typed-redux-saga';
import { isHexStrict } from '../../utils/web3-utils/index.js';
import { createAction, updateAction, FetchAction } from '../actions/index.js';
import { selectByIdSingle as selectNetwork } from '../../network/selectors/index.js';
import { selectByIdSingle } from '../selectors/index.js';

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
        const block = yield* select(selectByIdSingle, { networkId, number: paramAsNumber });
        if (!block) {
            yield* put(
                createAction(
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

    const network = yield* select(selectNetwork, networkId);
    const web3 = network?.web3 ?? network?.web3Sender;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    const result = yield* call(
        web3.eth.getBlock,
        blockHashOrBlockNumber,
        returnTransactionObjects ?? false, //default to false
    );
    if (blockExists) {
        yield* put(updateAction({ ...result, networkId }, action.meta.uuid));
    } else {
        //User passed blockHash as arg so we create the block only once data is passed
        yield* put(createAction({ ...result, networkId }, action.meta.uuid));
    }
}

export default fetchSaga;
