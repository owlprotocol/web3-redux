import { call, put, select } from 'typed-redux-saga';
import { CID } from 'multiformats/cid';
import IPFSSingleton from '../IPFSSingleton.js';
import { GET_CBOR, GetCBORAction, set, create } from '../actions/index.js';
import { create as createError } from '../../error/actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';

const GET_CBOR_ERROR = `${GET_CBOR}/ERROR`;
/** @category Sagas */
export function* getCBOR(action: GetCBORAction) {
    const { payload } = action;
    //invariant(IPFSSingleton.ipfs, 'IPFS client undefined!');
    if (!IPFSSingleton.ipfs) IPFSSingleton.setIPFS('http://localhost:5001');

    try {
        let { cid } = payload;
        if (typeof cid === 'string') cid = CID.parse(cid);

        //Check if contentId exists
        const content = yield* select(selectByIdSingle, cid.toString());
        if (!content) yield* put(create({ contentId: cid.toString() }));
        if (!content?.data) {
            const data = yield* call(IPFSSingleton.getCBOR, cid as CID);
            yield* put(set({ contentId: cid.toString(), key: 'data', value: data }));
        }
    } catch (error) {
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                errorMessage: (error as Error).message,
                type: GET_CBOR_ERROR,
            }),
        );
    }
}

export default getCBOR;
