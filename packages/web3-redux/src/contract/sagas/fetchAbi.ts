import { select, put, call } from 'typed-redux-saga';
import { AxiosResponse } from 'axios';
import { AbiItem } from '../../utils/web3-utils/index.js';

import { createAction, set as setAction, FetchAbiAction } from '../actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';
import { selectByIdSingle as selectNetwork } from '../../network/selectors/index.js';

/** @category Sagas */
export function* fetchAbi(action: FetchAbiAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const account = yield* select(selectByIdSingle, { networkId, address });
    if (!account) yield* put(createAction({ networkId, address }));

    const network = yield* select(selectNetwork, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const apiClient = network?.explorerApiClient;
    if (!apiClient) throw new Error(`Network ${networkId} missing apiClient`);

    const options = {
        params: {
            module: 'contract',
            action: 'getabi',
            address,
        },
    };

    const response = (yield* call(apiClient.get as any, '/', options)) as AxiosResponse;
    const abi = JSON.parse(response.data?.result) as AbiItem[];

    yield* put(setAction({ id: { networkId, address }, key: 'abi', value: abi }));
}

export default fetchAbi;
