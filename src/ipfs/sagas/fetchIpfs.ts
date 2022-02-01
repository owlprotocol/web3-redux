import { put, call } from 'typed-redux-saga/macro';
import { set, FetchIpfsAction } from '../actions';
import axios, { AxiosResponse } from 'axios';
import networkExists from '../../network/sagas/exists';

/** @category Sagas */
export function* fetchIpfs(action: FetchIpfsAction) {
    const { payload } = action;
    const { networkId, contentId } = payload;

    const network = yield* call(networkExists, networkId);
    const ipfsUrl = network.ipfsUrl;
    if (!ipfsUrl) throw new Error(`Network ${networkId} missing ipfsUrl`);

    const response = yield* call(axios.get, `${ipfsUrl}/cat/${contentId}`);
    yield* put(set({ id: { networkId, contentId }, key: 'data', value: (response as AxiosResponse).data }));
}

export default fetchIpfs;
