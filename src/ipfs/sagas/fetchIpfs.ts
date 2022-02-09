import { put, call, select } from 'typed-redux-saga/macro';
import axios, { AxiosResponse } from 'axios';
import { set, create, FetchIpfsAction, FETCH_IPFS } from '../actions';
import { selectIpfsUrl } from '../../config/selectors';
import { selectByIdSingle } from '../selectors';

const FETCH_IPFS_ERROR = `${FETCH_IPFS}/ERROR`;
/** @category Sagas */
export function* fetchIpfs(action: FetchIpfsAction) {
    try {
        const { payload } = action;
        const { contentId } = payload;

        //Check if contentId exists
        const content = yield* select(selectByIdSingle, contentId);
        if (!content) yield* put(create({ contentId }));

        const ipfsUrl = yield* select(selectIpfsUrl);

        //https://docs.ipfs.io/reference/http/api/
        const response = yield* call(axios.get, `${ipfsUrl}/api/v0/cat/${contentId}`);

        yield* put(set({ contentId, key: 'data', value: (response as AxiosResponse).data }));
    } catch (error) {
        console.error(error);
        yield* put({
            type: FETCH_IPFS_ERROR,
            error,
            errorMessage: (error as Error).message,
            action,
        });
    }
}

export default fetchIpfs;
