import { put, call, select } from 'typed-redux-saga';
import invariant from 'tiny-invariant';
import { keyBy } from '../../utils/lodash/index.js';
import { batchActions } from 'redux-batched-actions';
import { update, create, ObjectGetAction, OBJECT_GET } from '../actions/index.js';

import { selectConfig } from '../../config/selectors/index.js';
import { selectByIdSingle } from '../selectors/index.js';

const objectGet_ERROR = `${OBJECT_GET}/ERROR`;
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
        const pbNode = yield* call(client.object.get, contentId as any);
        const linksByName = keyBy(pbNode.Links, 'Name');
        yield* put(update({ contentId, pbNode, linksByName }));

        const actions = pbNode.Links.map((l) => {
            return create({ contentId: l.Hash.toString() });
        });
        if (actions.length > 0) {
            const batchCreate = batchActions(actions, `${create.type}/${actions.length}`);
            yield* put(batchCreate);
        }
    } catch (error) {
        console.error(error);
        yield* put({
            type: objectGet_ERROR,
            error,
            errorMessage: (error as Error).message,
            action,
        });
    }
}

export default objectGet;
