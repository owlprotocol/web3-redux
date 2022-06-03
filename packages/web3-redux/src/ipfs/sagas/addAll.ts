import { call, put, select } from 'typed-redux-saga';
import { CID } from 'multiformats';
import IPFSSingleton from '../IPFSSingleton.js';
import { create, AddAllAction, ADD_ALL, update } from '../actions/index.js';
import { create as createError } from '../../error/actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';
import asyncGeneratorToArray from '../../utils/asyncGeneratorToArray.js';
import { IPFSDataType } from '../model/interface.js';

const ADD_ALL_ERROR = `${ADD_ALL}/ERROR`;
/** @category Sagas */
export function* addAll(action: AddAllAction) {
    const { payload } = action;
    const { files, options } = payload;

    if (!IPFSSingleton.ipfs) IPFSSingleton.setIPFS('http://localhost:5001');
    const ipfs = IPFSSingleton.ipfs!;

    try {
        const iter = yield* call([ipfs, ipfs.addAll], files, options);
        const entries = (yield* call(asyncGeneratorToArray, iter)) as { cid: CID; size: number; path: string }[];

        //Redux Cache
        for (let i = 0; i < entries.length; i++) {
            //@ts-expect-error
            const file = files[i];
            const { cid } = entries[i];

            const content = yield* select(selectByIdSingle, cid.toString());
            if (!content) yield* put(create({ contentId: cid.toString(), data: file, type: IPFSDataType.File }));
            else if (!content?.data)
                yield* put(update({ contentId: cid.toString(), data: file, type: IPFSDataType.File }));
        }
    } catch (error) {
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                errorMessage: (error as Error).message,
                type: ADD_ALL_ERROR,
            }),
        );
    }
}

export default addAll;
