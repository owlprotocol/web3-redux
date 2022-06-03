import { call, put, select } from 'typed-redux-saga';
import { importer } from 'ipfs-unixfs-importer';
import { CID } from 'multiformats';
import { UnixFS } from 'ipfs-unixfs-exporter';
//import { Buffer } from 'buffer';
import IPFSSingleton from '../IPFSSingleton.js';
import { Cat2Action, CAT2, update } from '../actions/index.js';
import { create as createError } from '../../error/actions/index.js';
import { selectByIdSingle, selectPathHash } from '../selectors/index.js';
import { blockstore } from '../blockstore.js';
import asyncGeneratorToArray from '../../utils/asyncGeneratorToArray.js';
import { IPFSDataType } from '../model/interface.js';

const CAT2_ERROR = `${CAT2}/ERROR`;
/** @category Sagas */
export function* cat2(action: Cat2Action) {
    const { payload } = action;
    const { path, options } = payload;

    if (!IPFSSingleton.ipfs) IPFSSingleton.setIPFS('http://localhost:5001');
    const ipfs = IPFSSingleton.ipfs!;

    try {
        let cid: string | undefined;
        if (typeof path != 'string') cid = path.toString(); //root CID
        else cid = yield* select(selectPathHash, path); //IPFS UnixFS Path

        const content = yield* select(selectByIdSingle, cid);
        if (!content?.data) {
            const iter = ipfs.cat(cid ?? path, options);
            const iterImports = importer({ content: iter }, blockstore);
            //Hacky way to await promise using redux-saga
            const entries = (yield* call(asyncGeneratorToArray, iterImports)) as {
                cid: CID;
                path: string | undefined;
                unixfs: UnixFS | undefined;
                size: number;
            }[];

            //Redux Cache
            for (let i = 0; i < entries.length; i++) {
                const { cid, unixfs } = entries[i];

                if (unixfs?.data) {
                    const buffer = unixfs.data.toString(); // Buffer.from(unixfs.data);
                    yield* put(
                        update({
                            contentId: cid.toString(),
                            data: buffer, //.toString('base64'),
                            type: IPFSDataType.File,
                        }),
                    );
                }
            }
        }
    } catch (error) {
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                errorMessage: (error as Error).message,
                type: CAT2_ERROR,
            }),
        );
    }
}

export default cat2;
