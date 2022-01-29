import { select, put, call } from 'typed-redux-saga/macro';
import axios from 'axios';
import { AbiItem } from 'web3-utils';
import networkExists from '../../network/sagas/exists';
import { create, set as setAction, FetchAbiAction } from '../actions';
import { selectByIdSingle } from '../selectors';

/** @category Sagas */
export function* fetchAbi(action: FetchAbiAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const account = yield* select(selectByIdSingle, { networkId, address });
    if (!account) yield* put(create({ networkId, address }));

    const network = yield* call(networkExists, networkId);
    const apiUrl = network.explorerApiUrl;
    const apiKey = network.explorerApiKey;
    if (!apiUrl) throw new Error(`Network ${networkId} missing apiUrl`);

    const request = {
        method: 'get',
        url: apiUrl,
        params: {
            module: 'contract',
            action: 'getabi',
            address,
            apikey: apiKey,
        },
    };

    //@ts-expect-error
    const response = yield* call(axios, request);
    const abi = JSON.parse(response.data?.result) as AbiItem[];

    yield* put(setAction({ id: { networkId, address }, key: 'abi', value: abi }));
}

export default fetchAbi;
