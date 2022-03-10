import { put, call } from 'typed-redux-saga/macro';
import { create, FetchAction, FETCH, set } from '../actions/index.js';
import networkExists from '../../network/sagas/exists.js';
import { Network } from '../../network/model/index.js';
import { getIdArgs } from '../model/interface.js';

const ADDRESS_0 = '0x0000000000000000000000000000000000000000';
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
            { ...payload, gas, from: payload.from ?? ADDRESS_0 },
            defaultBlock ?? 'latest',
        );

        yield* put(set({ id: getIdArgs(payload), key: 'returnValue', value: returnValue }));
    } catch (error) {
        console.error(error);
        yield* put({
            type: FETCH_ERROR,
            error,
            action,
        });
    }
}
