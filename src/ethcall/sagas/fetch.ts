import { put, call } from 'typed-redux-saga/macro';
import { create, FetchAction, FETCH, update } from '../actions';
import { ZERO_ADDRESS } from '../../utils';
import networkExists from '../../network/sagas/exists';
import { Network } from '../../network/model';

const FETCH_ERROR = `${FETCH}/ERROR`;

export default function* fetch(action: FetchAction) {
    try {
        const { payload } = action;
        const { networkId, defaultBlock } = payload;
        const network: Network = yield* call(networkExists, networkId);
        if (!network.web3) throw new Error(`Network ${networkId} missing web3`);
        const web3 = network.web3;

        yield* put(create(payload));

        const gas = payload.gas ?? (yield* call(web3.eth.estimateGas, payload)); //default gas

        //@ts-ignore
        const returnValue: any = yield* call(
            //@ts-ignore
            web3.eth.call,
            { ...payload, gas, from: payload.from ?? ZERO_ADDRESS },
            defaultBlock ?? 'latest',
        );

        yield* put(update({ ...payload, returnValue }));
    } catch (error) {
        console.error(error);
        yield* put({
            type: FETCH_ERROR,
            error,
            action,
        });
    }
}
