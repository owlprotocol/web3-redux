import { call } from 'typed-redux-saga';
import IPFSSingleton from '../IPFSSingleton.js';
import { PutCBORAction } from '../actions/index.js';

/** @category Sagas */
export function* putCBOR(action: PutCBORAction) {
    const { payload } = action;
    //invariant(IPFSSingleton.ipfs, 'IPFS client undefined!');
    if (!IPFSSingleton.ipfs) {
        IPFSSingleton.setIPFS('http://localhost:5001');
    }

    try {
        const cid = yield* call(IPFSSingleton.putCBOR, payload, { pin: true });
        console.debug({ cid });
    } catch (error) {
        console.log(error);
    }
}

export default putCBOR;
