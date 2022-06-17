import { put, call, select } from 'typed-redux-saga';
import invariant from 'tiny-invariant';
import { AxiosResponse } from 'axios';
import { keyBy } from '../../utils/lodash/index.js';
import { update, createBatchedAction, ObjectGetAction, OBJECT_GET } from '../actions/index.js';

import { selectConfig } from '../../config/selectors/index.js';
import { selectByIdSingle } from '../selectors/index.js';

const OBJECT_GET_ERROR = `${OBJECT_GET}/ERROR`;
/** @objectGetegory Sagas */
export function* objectGet(action: ObjectGetAction) {
    try {
        const client = (yield* select(selectConfig)).ipfsClient;
        invariant(client, 'IPFS client undefined!');

        const contentId = action.payload;
        //Check if contentId exists
        const content = yield* select(selectByIdSingle, contentId);
        if (!content) yield* put(create({ contentId }));

        //https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/BLOCK.md#ipfsblockgetcid-options
        //https://docs.ipfs.io/reference/http/api/#api-v0-object-get
        const response = (yield* call(client.post, '/api/v0/object/get', { arg: contentId })) as AxiosResponse;
        const pbNode = response.data as { Links?: { Name: string }[] };
        const linksByName = keyBy(pbNode.Links, 'Name');
        yield* put(update({ contentId, pbNode: pbNode as any, linksByName }));

        //TODO Add pbNode type
        const entries =
            pbNode.Links?.map((l: any) => {
                return { contentId: l.Hash.toString() };
            }) ?? [];
        if (entries.length > 0) {
            const action = createBatchedAction(entries);
            yield* put(action);
        }
    } catch (error) {
        console.error(error);
        yield* put({
            type: OBJECT_GET_ERROR,
            error,
            errorMessage: (error as Error).message,
            action,
        });
    }
}

export default objectGet;
