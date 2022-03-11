import { put, call, select } from 'typed-redux-saga';
import invariant from 'tiny-invariant';
import { objectGet } from './objectGet.js';
import { objectGet as objectGetAction, FetchIpfsAction, cat } from '../actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';

/** @category Sagas */
export function* fetchIpfs(action: FetchIpfsAction) {
    const { payload } = action;
    // eslint-disable-next-line prefer-const
    let [cid, ...links] = payload.split('/');

    //Recursively resolve IPFS
    for (const p of links) {
        let object = yield* select(selectByIdSingle, cid);
        //If no object data
        if (!object?.pbNode?.Data) {
            yield* call(objectGet, objectGetAction(cid));
            object = yield* select(selectByIdSingle, cid);
        }
        const link = (object?.linksByName ?? {})[p];
        const newCid = link?.Hash;
        invariant(newCid, `${cid}/${p} undefined!`);
        cid = newCid.toString();
    }

    //Get object for final cid
    const object = yield* select(selectByIdSingle, cid);
    //If no object data
    if (!object?.pbNode?.Data) yield* call(objectGet, objectGetAction(cid));

    yield* put(cat(cid));
}

export default fetchIpfs;
