import { put, call, select } from 'typed-redux-saga';
import invariant from 'tiny-invariant';

import { set, create, CatAction, CAT } from '../actions/index.js';

import { selectConfig } from '../../config/selectors/index.js';
import { selectByIdSingle } from '../selectors/index.js';

// eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-commonjs
const toBuffer = require('it-to-buffer');

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
        console.debug({ catGen });
        const catDataPromise = toBuffer(catGen);
        const decoder = new TextDecoder();
        const catData = yield* call(async () => {
            return catDataPromise;
        });
        let catDecoded = decoder.decode(catData);
        console.debug({ catDecoded });
        try {
            catDecoded = JSON.parse(catDecoded);
        } catch { }
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
