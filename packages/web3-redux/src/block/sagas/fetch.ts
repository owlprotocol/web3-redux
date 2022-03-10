import { select, put, call } from 'typed-redux-saga/macro';
import { isHexStrict } from 'web3-utils';
import { create, update, FetchAction } from '../actions/index.js';
import networkExists from '../../network/sagas/exists.js';
import { selectByIdSingle } from '../selectors/index.js';

/** @category Sagas */
function* fetch(action: FetchAction) {
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
                create({
                    networkId,
                    number: paramAsNumber,
                }),
            );
        }
        blockExists = true;
    }

    const network = yield* call(networkExists, networkId);
    const web3 = network.web3 ?? network.web3Sender;
    if (!web3) throw new Error(`Network ${networkId} missing web3`);

    const result = yield* call(
        web3.eth.getBlock,
        blockHashOrBlockNumber,
        returnTransactionObjects ?? false, //default to false
    );
    if (blockExists) {
        yield* put(update({ ...result, networkId }));
    } else {
        //User passed blockHash as arg so we create the block only once data is passed
        yield* put(create({ ...result, networkId }));
    }
}

export default fetch;
