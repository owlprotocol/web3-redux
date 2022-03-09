import { put, call } from 'typed-redux-saga/macro';
import { batchActions } from 'redux-batched-actions';
import invariant from 'tiny-invariant';
import { create as createEvent, GetPastLogsAction, GET_PAST_LOGS } from '../actions';
import networkExists from '../../network/sagas/exists';

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

        const actions = result.map((l) => {
            return createEvent({ ...l, networkId });
        });
        if (actions.length > 0) {
            const batchCreate = batchActions(actions, `${createEvent.type}/${actions.length}`);
            yield* put(batchCreate);
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
