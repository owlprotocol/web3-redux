import { put, call, select } from 'typed-redux-saga';
import { FetchAction, FETCH } from '../actions/index.js';
import { create as createError } from '../../error/actions/index.js';
import EthCallCRUD from '../crud.js';
import NetworkCRUD from '../../network/crud.js';

const ADDRESS_0 = '0x0000000000000000000000000000000000000000';
const FETCH_ERROR = `${FETCH}/ERROR`;

export default function* fetch(action: FetchAction) {
    const { payload } = action;
    const { networkId, defaultBlock } = payload;

    const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, { networkId });
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3 ?? network.web3Sender;
    if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

    yield* put(EthCallCRUD.actions.create({ ...payload, status: 'LOADING' }));

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
        yield* put(
            EthCallCRUD.actions.update({
                ...payload,
                error: undefined,
                returnValue,
                status: 'SUCCESS',
                lastUpdated: timestamp,
            }),
        );
    } catch (error) {
        const timestamp = Date.now();
        yield* put(
            EthCallCRUD.actions.update({ ...payload, error: error as Error, status: 'ERROR', lastUpdated: timestamp }),
        );
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
