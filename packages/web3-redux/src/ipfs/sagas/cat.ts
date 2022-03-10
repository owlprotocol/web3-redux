import { put, call, select } from 'typed-redux-saga/macro';
import invariant from 'tiny-invariant';
//TODO: FIX Replace with ECMA Module
//@ts-ignore
import * as toBuffer from 'it-to-buffer';

import { set, create, CatAction, CAT } from '../actions';

import { selectConfig } from '../../config/selectors';
import { selectByIdSingle } from '../selectors';

const CAT_ERROR = `${CAT}/ERROR`;
/** @category Sagas */
export function* cat(action: CatAction) {
    try {
        const client = (yield* select(selectConfig)).ipfsClient;
        invariant(client, 'IPFS client undefined!');

        const contentId = action.payload;
        //Check if contentId exists
        const content = yield* select(selectByIdSingle, contentId);
        if (!content) yield* put(create({ contentId }));

        //https://docs.ipfs.io/reference/http/api/
        //https://github.com/ipfs/js-ipfs/blob/master/docs/MIGRATION-TO-ASYNC-AWAIT.md#pull-stream-pipelines
        const catGen = client.cat(contentId);
        const catDataPromise = toBuffer(catGen);
        const decoder = new TextDecoder();
        const catData = yield* call(async () => {
            return catDataPromise;
        });
        let catDecoded = decoder.decode(catData);
        try {
            catDecoded = JSON.parse(catDecoded);
        } catch {}
        yield* put(set({ contentId, key: 'data', value: catDecoded }));
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
