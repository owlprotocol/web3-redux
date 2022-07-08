//@ts-nocheck
import { call, put, select } from 'typed-redux-saga';
import { code as codeCBOR, encode as encodeCBOR } from '@ipld/dag-cbor';
import { CID } from 'multiformats';
import { sha256 } from 'multiformats/hashes/sha2';
import IPFSSingleton from '../IPFSSingleton.js';
import { PutCBORAction, PUT_CBOR } from '../actions/index.js';
import { create as createError } from '../../error/actions/index.js';
import IPFSCacheCRUD from '../crud.js';

const PUT_CBOR_ERROR = `${PUT_CBOR}/ERROR`;
/** @category Sagas */
export function* putCBOR(action: PutCBORAction) {
    const { payload } = action;
    //invariant(IPFSSingleton.ipfs, 'IPFS client undefined!');
    if (!IPFSSingleton.ipfs) IPFSSingleton.setIPFS('http://localhost:5001');

    try {
        const data = encodeCBOR(payload);
        const digest = yield* call([sha256, sha256.digest], data);
        const cid = CID.create(1, codeCBOR, digest as any);

        //Check if contentId exists
        const content = yield* select(IPFSCacheCRUD.selectors.selectByIdSingle, cid.toString());
        if (!content) yield* put(IPFSCacheCRUD.actions.create({ contentId: cid.toString(), data: payload }));
        else if (!content?.data) yield* put(IPFSCacheCRUD.actions.update({ contentId: cid.toString(), data: payload }));

        yield* call(IPFSSingleton.putCBOR, payload, { pin: true });
    } catch (error) {
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                type: PUT_CBOR_ERROR,
            }),
        );
    }
}

export default putCBOR;
