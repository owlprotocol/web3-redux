import { put, call, select } from 'typed-redux-saga/macro';
import invariant from 'tiny-invariant';
import { objectGet as objectGetAction, FetchIpfsAction, FETCH_IPFS, cat } from '../actions';
import { selectIpfsUrl } from '../../config/selectors';
import { selectByIdSingle } from '../selectors';
import objectGet from './objectGet';

const FETCH_IPFS_ERROR = `${FETCH_IPFS}/ERROR`;
/** @category Sagas */
export function* fetchIpfs(action: FetchIpfsAction) {
    try {
        const ipfsUrl = yield* select(selectIpfsUrl);
        invariant(ipfsUrl, 'IPFS URL undefined!');

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
    } catch (error) {
        console.error(error);
        yield* put({
            type: FETCH_IPFS_ERROR,
            error,
            errorMessage: (error as Error).message,
            action,
        });
    }
}

export default fetchIpfs;
