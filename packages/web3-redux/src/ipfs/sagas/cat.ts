import { put, call, select } from 'typed-redux-saga';
import invariant from 'tiny-invariant';
import { AxiosResponse } from 'axios';

import { set, createAction, CatAction, CAT } from '../actions/index.js';

import { selectConfig } from '../../config/selectors/index.js';
import { selectByIdSingle } from '../selectors/index.js';

const CAT_ERROR = `${CAT}/ERROR`;
/** @category Sagas */
export function* cat(action: CatAction) {
    try {
        const client = (yield* select(selectConfig)).ipfsClient;
        invariant(client, 'IPFS client undefined!');

        const contentId = action.payload;
        //Check if contentId exists
        const content = yield* select(selectByIdSingle, contentId);
        if (!content) yield* put(createAction({ contentId }));

        //https://docs.ipfs.io/reference/http/api/
        //https://docs.ipfs.io/reference/http/api/#api-v0-cat
        const response = (yield* call(client.post, '/api/v0/cat', { arg: contentId })) as AxiosResponse;
        const catDecoded = response.data;
        yield* put(set({ contentId, key: 'data', value: catDecoded }));
    } catch (error) {
        yield* put({
            type: CAT_ERROR,
            error,
            errorMessage: (error as Error).message,
            action,
        });
    }
}

export default cat;
