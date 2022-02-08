import { put, call } from 'typed-redux-saga/macro';
import { set, FetchIpfsAction } from '../actions';
import axios, { AxiosResponse } from 'axios';

/** @category Sagas */
export function* fetchIpfs(action: FetchIpfsAction) {
    const { payload } = action;
    const { contentId } = payload;

    const response = yield* call(axios.get, `https://ipfs.infura.io:5001/api/v0/cat/${contentId}`);

    yield* put(set({ contentId, key: 'data', value: (response as AxiosResponse).data }));
}

export default fetchIpfs;
