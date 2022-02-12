import { put, call, select } from 'typed-redux-saga/macro';
import { create as createIPFSClient } from 'ipfs-http-client';
import invariant from 'tiny-invariant';
import lodash from 'lodash';
import { batchActions } from 'redux-batched-actions';
import { update, create, ObjectGetAction, OBJECT_GET } from '../actions';
import { selectIpfsUrl } from '../../config/selectors';
import { selectByIdSingle } from '../selectors';

const objectGet_ERROR = `${OBJECT_GET}/ERROR`;
/** @objectGetegory Sagas */
export function* objectGet(action: ObjectGetAction) {
    try {
        const ipfsUrl = yield* select(selectIpfsUrl);
        invariant(ipfsUrl, 'IPFS URL undefined!');

        const contentId = action.payload;
        //Check if contentId exists
        const content = yield* select(selectByIdSingle, contentId);
        if (!content) yield* put(create({ contentId }));

        const client = createIPFSClient({ url: ipfsUrl });

        //https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/BLOCK.md#ipfsblockgetcid-options
        const pbNode = yield* call(client.object.get, contentId as any);
        const linksByName = lodash.keyBy(pbNode.Links, 'Name');
        yield* put(update({ contentId, pbNode, linksByName }));

        const newIpfs = pbNode.Links.map((l) => {
            return create({ contentId: l.Hash.toString() });
        });
        if (newIpfs.length > 0) {
            const newIpfsBatch = batchActions(newIpfs);
            yield* put(newIpfsBatch);
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
