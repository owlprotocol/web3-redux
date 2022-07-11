import { call, put, select } from 'typed-redux-saga';
import { CID } from 'multiformats';
import { AddAllAction, ADD_ALL } from '../actions/index.js';
import { create as createError } from '../../error/actions/index.js';
import asyncGeneratorToArray from '../../utils/asyncGeneratorToArray.js';
import { IPFSDataType } from '../model/interface.js';
import ConfigCRUD from '../../config/crud.js';
import IPFSCacheCRUD from '../crud.js';

const ADD_ALL_ERROR = `${ADD_ALL}/ERROR`;
/** @category Sagas */
export function* addAll(action: AddAllAction) {
    const { payload } = action;
    const { files, options } = payload;

    const config = yield* select(ConfigCRUD.selectors.selectByIdSingle, { id: '0' });
    const { ipfsClient: ipfs } = config ?? {};
    if (!ipfs) throw new Error('ipfClient undefined');

    try {
        const iter = yield* call([ipfs, ipfs.addAll], files, options);
        const entries = (yield* call(asyncGeneratorToArray, iter)) as { cid: CID; size: number; path: string }[];

        //Redux Cache
        for (let i = 0; i < entries.length; i++) {
            //@ts-expect-error
            const file = files[i];
            const { cid } = entries[i];

            const content = yield* call(IPFSCacheCRUD.db.get, cid.toString());
            if (!content)
                yield* put(
                    IPFSCacheCRUD.actions.create({ contentId: cid.toString(), data: file, type: IPFSDataType.File }),
                );
            else if (!content?.data)
                yield* put(
                    IPFSCacheCRUD.actions.update({ contentId: cid.toString(), data: file, type: IPFSDataType.File }),
                );
        }
    } catch (error) {
        const err = error as Error
        yield* put(
            createError({
                id: action.meta.uuid,
                errorMessage: err.message,
                stack: err.stack,
                type: ADD_ALL_ERROR,
            }),
        );
    }
}

export default addAll;
