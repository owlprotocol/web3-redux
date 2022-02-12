import { put, call, select } from 'typed-redux-saga/macro';
import axios, { AxiosResponse } from 'axios';
import invariant from 'tiny-invariant';

import { set, create, CatAction, CAT } from '../actions';
import { selectIpfsUrl } from '../../config/selectors';
import { selectByIdSingle } from '../selectors';

const CAT_ERROR = `${CAT}/ERROR`;
/** @category Sagas */
export function* cat(action: CatAction) {
    try {
        const contentId = action.payload;

        //Check if contentId exists
        const content = yield* select(selectByIdSingle, contentId);
        if (!content) yield* put(create({ contentId }));

        const ipfsUrl = yield* select(selectIpfsUrl);
        invariant(ipfsUrl, 'IPFS URL undefined!');

        //https://docs.ipfs.io/reference/http/api/
        const response = yield* call(axios.get, `${ipfsUrl}/api/v0/cat/${contentId}`);

        yield* put(set({ contentId, key: 'data', value: (response as AxiosResponse).data }));
    } catch (error) {
        console.error(error);
        yield* put({
            type: CAT_ERROR,
            error,
            errorMessage: (error as Error).message,
            action,
        });
    }
}

export default cat;
