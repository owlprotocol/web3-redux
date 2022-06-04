import { call, put, select } from 'typed-redux-saga';
import { code as codeCBOR, encode as encodeCBOR } from '@ipld/dag-cbor';
import { CID } from 'multiformats';
import { sha256 } from 'multiformats/hashes/sha2';
import IPFSSingleton from '../IPFSSingleton.js';
import { create, PutCBORAction, PUT_CBOR, set } from '../actions/index.js';
import { create as createError } from '../../error/actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';

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
        const content = yield* select(selectByIdSingle, cid.toString());
        if (!content) yield* put(create({ contentId: cid.toString(), data: payload }));
        else if (!content?.data) yield* put(set({ contentId: cid.toString(), key: 'data', value: payload }));

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
