import { call, put, select } from 'typed-redux-saga';
import { importer } from 'ipfs-unixfs-importer';
import { CID } from 'multiformats';
import { UnixFS } from 'ipfs-unixfs-exporter';
import { CatAction, CAT } from '../actions/index.js';
import { create as createError } from '../../error/actions/index.js';
import { blockstore } from '../blockstore.js';
import asyncGeneratorToArray from '../../utils/asyncGeneratorToArray.js';
import Ipfs, { IPFSDataType } from '../model/interface.js';
import ConfigCRUD from '../../config/crud.js';
import IPFSCacheCRUD from '../crud.js';
import getDB from '../../db.js';

const CAT_ERROR = `${CAT}/ERROR`;
/** @category Sagas */
export function* cat(action: CatAction) {
    const { payload } = action;
    const { path, options } = payload;
    //If CID convert to string
    const pathStr = typeof path === 'string' ? path : path.toString();

    const config = yield* select(ConfigCRUD.selectors.selectByIdSingle, { id: '0' });
    const { ipfsClient: ipfs } = config ?? {};
    if (!ipfs) throw new Error('ipfClient undefined');

    try {
        const db = getDB();
        let content: Ipfs | undefined;
        if (typeof path === 'string') {
            const fn = async () => {
                return db.IPFSCache.where('paths').equals(path).first();
            };
            content = yield* call(fn);
        } else {
            content = yield* call(IPFSCacheCRUD.db.get, pathStr);
        }

        if (!content?.data) {
            const iter = ipfs.cat(path, options);
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
                    if (!content) {
                        yield* put(
                            IPFSCacheCRUD.actions.create({
                                contentId: cid.toString(),
                                data: unixfs.data,
                                type: IPFSDataType.File,
                                paths: [pathStr],
                            }),
                        );
                    } else {
                        yield* put(
                            IPFSCacheCRUD.actions.update({
                                contentId: cid.toString(),
                                data: unixfs.data,
                                type: IPFSDataType.File,
                                paths: [pathStr],
                            }),
                        );
                    }
                }
            }
        }
    } catch (error) {
        const err = error as Error;
        yield* put(
            createError(
                {
                    id: action.meta.uuid,
                    errorMessage: err.message,
                    stack: err.stack,
                    type: CAT_ERROR,
                },
                action.meta.uuid,
            ),
        );
    }
}

export default cat;
