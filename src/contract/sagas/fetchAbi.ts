import { select, put, call } from 'typed-redux-saga/macro';
import axios from 'axios';
import networkExists from '../../network/sagas/exists';
import { create, FetchAbiAction } from '../actions';
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
        method: 'url',
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
    const abi: any = response.data?.result;

    //TODO: Create update ABI
    console.debug(abi);
}

export default fetchAbi;
