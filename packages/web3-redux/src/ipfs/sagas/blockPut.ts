//@ts-nocheck
import { call, put, select } from 'typed-redux-saga';
import IPFSSingleton from '../IPFSSingleton.js';
import { BlockPutAction, BLOCK_PUT } from '../actions/index.js';
import { create as createError } from '../../error/actions/index.js';
import { IPFSDataType } from '../model/interface.js';

const BLOCK_PUT_ERROR = `${BLOCK_PUT}/ERROR`;
/** @category Sagas */
export function* blockGet(action: BlockPutAction) {
    const { payload } = action;
    const { block, options } = payload;

    if (!IPFSSingleton.ipfs) IPFSSingleton.setIPFS('http://localhost:5001');
    const ipfs = IPFSSingleton.ipfs!;

    try {
        const cid = yield* call([ipfs, ipfs.block.put], block, options);
        const type = options?.format === 'dag-cbor' ? IPFSDataType.DAG_CBOR : IPFSDataType.Raw;
        //Redux Cache
        const content = yield* select(selectByIdSingle, cid.toString());
        if (!content) yield* put(createAction({ contentId: cid.toString(), data: block, type }));
        else if (!content?.data) yield* put(updateAction({ contentId: cid.toString(), data: block, type }));
    } catch (error) {
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                errorMessage: (error as Error).message,
                type: BLOCK_PUT_ERROR,
            }),
        );
    }
}

export default blockGet;
