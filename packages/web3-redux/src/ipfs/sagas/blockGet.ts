//@ts-nocheck
import { call, put, select } from 'typed-redux-saga';
import IPFSSingleton from '../IPFSSingleton.js';
import { BlockGetAction, BLOCK_GET } from '../actions/index.js';
import { create as createError } from '../../error/actions/index.js';
import { IPFSDataType } from '../model/interface.js';

const BLOCK_GET_ERROR = `${BLOCK_GET}/ERROR`;
/** @category Sagas */
export function* blockGet(action: BlockGetAction) {
    const { payload } = action;
    const { cid, options } = payload;

    if (!IPFSSingleton.ipfs) IPFSSingleton.setIPFS('http://localhost:5001');
    const ipfs = IPFSSingleton.ipfs!;

    try {
        //Redux Cache
        const content = yield* select(selectByIdSingle, cid.toString());

        if (!content?.data) {
            //Get block data
            const data = yield* call([ipfs, ipfs.block.get], cid, options);
            yield* put(updateAction({ contentId: cid.toString(), data, type: IPFSDataType.Raw }));
        }
    } catch (error) {
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                errorMessage: (error as Error).message,
                type: BLOCK_GET_ERROR,
            }),
        );
    }
}

export default blockGet;
