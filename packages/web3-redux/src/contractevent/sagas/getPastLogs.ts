import { put, call } from 'typed-redux-saga';
import invariant from 'tiny-invariant';
import { createBatchedAction, GetPastLogsAction, GET_PAST_LOGS } from '../actions/index.js';
import networkExists from '../../network/sagas/exists.js';

const GET_PAST_LOGS_ERROR = `${GET_PAST_LOGS}/ERROR`;

function* getPastLogs(action: GetPastLogsAction) {
    try {
        const { payload } = action;
        const { networkId, address, topics, fromBlock, toBlock } = payload;

        const network = yield* call(networkExists, networkId);
        const web3 = network.web3 ?? network.web3Sender;
        invariant(web3, `Network ${networkId} missing web3`);

        const options = { address, topics, fromBlock, toBlock };
        const result = yield* call(web3.eth.getPastLogs, options);

        if (result.length > 0) {
            const action = createBatchedAction(
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
