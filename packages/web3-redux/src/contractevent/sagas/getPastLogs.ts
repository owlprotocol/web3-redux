import { put, call, select } from 'typed-redux-saga';
import NetworkCRUD from '../../network/crud.js';
import { GetPastLogsAction, GET_PAST_LOGS } from '../actions/index.js';
import ContractEventCRUD from '../crud.js';

const GET_PAST_LOGS_ERROR = `${GET_PAST_LOGS}/ERROR`;

function* getPastLogs(action: GetPastLogsAction) {
    try {
        const { payload } = action;
        const { networkId, address, topics, fromBlock, toBlock } = payload;

        const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, { networkId });
        if (!network) throw new Error(`Network ${networkId} undefined`);

        const web3 = network.web3 ?? network.web3Sender;
        if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

        const options = { address, topics, fromBlock, toBlock };
        const result = yield* call(web3.eth.getPastLogs, options);

        if (result.length > 0) {
            const action = ContractEventCRUD.actions.createBatched(
                result.map((l) => {
                    return { ...l, networkId };
                }),
            );

            yield* put(action);
        }

        return result;
    } catch (error) {
        console.error(error);
        yield* put({
            type: GET_PAST_LOGS_ERROR,
            error,
            action,
        });
    }
}

export default getPastLogs;
