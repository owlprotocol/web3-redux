import { put, call } from 'typed-redux-saga';
import { create, FetchAction, FETCH, update } from '../actions/index.js';
import networkExists from '../../network/sagas/exists.js';
import { Network } from '../../network/model/index.js';
import { create as createError } from '../../error/actions/index.js';

const ADDRESS_0 = '0x0000000000000000000000000000000000000000';
const FETCH_ERROR = `${FETCH}/ERROR`;

export default function* fetch(action: FetchAction) {
    const { payload } = action;
    const { networkId, defaultBlock } = payload;
    const network: Network = yield* call(networkExists, networkId);
    if (!network.web3) throw new Error(`Network ${networkId} missing web3`);
    const web3 = network.web3;
    yield* put(create(payload));

    try {
        const gas = payload.gas ?? (yield* call(web3.eth.estimateGas, payload)); //default gas

        //@ts-ignore
        const returnValue: any = yield* call(
            //@ts-ignore
            web3.eth.call,
            { ...payload, gas, from: payload.from ?? ADDRESS_0 },
            defaultBlock ?? 'latest',
        );

        const timestamp = Date.now();
        yield* put(update({ ...payload, error: undefined, returnValue, status: 'SUCCESS', lastUpdated: timestamp }));
    } catch (error) {
        const timestamp = Date.now();
        yield* put(update({ ...payload, error: error as Error, status: 'ERROR', lastUpdated: timestamp }));
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                errorMessage: (error as Error).message,
                type: FETCH_ERROR,
            }),
        );
    }
}
