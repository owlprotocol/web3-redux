import { call, put, select } from 'typed-redux-saga';
import IPFSSingleton from '../IPFSSingleton.js';
import { create, BlockPutAction, BLOCK_PUT, update } from '../actions/index.js';
import { create as createError } from '../../error/actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';
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
        //Redux Cache
        const content = yield* select(selectByIdSingle, cid.toString());
        if (!content) yield* put(create({ contentId: cid.toString(), data: block, type: IPFSDataType.Raw }));
        else if (!content?.data) yield* put(update({ contentId: cid.toString(), data: block, type: IPFSDataType.Raw }));
    } catch (error) {
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                type: BLOCK_PUT_ERROR,
            }),
        );
    }
}

export default blockGet;
