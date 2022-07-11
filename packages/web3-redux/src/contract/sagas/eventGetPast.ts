import { put, call, select } from 'typed-redux-saga';
import NetworkCRUD from '../../network/crud.js';
import { EventGetPastAction, EVENT_GET_PAST, eventGetPastRaw as eventGetPastRawAction } from '../actions/index.js';
import ContractCRUD from '../crud.js';

const EVENT_GET_PAST_ERROR = `${EVENT_GET_PAST}/ERROR`;

/** Batches event requests into EventGetPastRaw actions */
export function* eventGetPast(action: EventGetPastAction) {
    try {
        const { payload } = action;
        const { networkId, address, eventName, filter, fromBlock, toBlock, blockBatch, max } = payload;

        const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, { networkId });
        if (!network) throw new Error(`Network ${networkId} undefined`);

        const web3 = network.web3 ?? network.web3Sender;
        if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

        const contract = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
        if (!contract) throw new Error(`Contract ${ContractCRUD.validateId({ networkId, address })} undefined`);

        const web3Contract = contract.web3Contract ?? contract.web3SenderContract;
        if (!web3Contract)
            throw new Error(`Contract ${ContractCRUD.validateId({ networkId, address })} has no web3 contract`);

        //Ranged queries
        const eventCount = 0;
        let currToBlock;
        if (!toBlock || toBlock === 'latest') {
            currToBlock = yield* call(web3.eth.getBlockNumber);
        } else {
            currToBlock = toBlock;
        }

        let currFromBlock = Math.max(currToBlock - blockBatch - 1, fromBlock); //lower-bound fromBlock=0

        while (currFromBlock >= fromBlock && (eventCount < max || !max)) {
            try {
                //blocking call, choose batch size accordingly
                yield* put(
                    eventGetPastRawAction(
                        {
                            networkId,
                            address,
                            eventName,
                            filter,
                            fromBlock: currFromBlock,
                            toBlock: currToBlock,
                            max,
                        },
                        action.meta.uuid,
                    ),
                );
                currToBlock = Math.max(currToBlock - blockBatch, currFromBlock);
                currFromBlock = Math.max(currToBlock - blockBatch - 1, fromBlock);
                if (currToBlock === currFromBlock) break;
            } catch (error) {
                yield* put({
                    id: action.meta.uuid,
                    stack: (error as Error).stack,
                    errorMessage: (error as Error).message,
                    type: EVENT_GET_PAST_ERROR,
                });
            }
        }
    } catch (error) {
        yield* put({
            id: action.meta.uuid,
            stack: (error as Error).stack,
            errorMessage: (error as Error).message,
            type: EVENT_GET_PAST_ERROR,
        });
    }
}

export default eventGetPast;
