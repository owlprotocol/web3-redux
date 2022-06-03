import { call, put, select } from 'typed-redux-saga';
import IPFSSingleton from '../IPFSSingleton.js';
import { create, BlockGetAction, BLOCK_GET, update } from '../actions/index.js';
import { create as createError } from '../../error/actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';
import { IPFSDataType } from '../model/interface.js';

const BLOCK_GET_ERROR = `${BLOCK_GET}/ERROR`;
/** @category Sagas */
export function* blockGet(action: BlockGetAction) {
    const { payload } = action;
    const { cid, options } = payload;

    if (!IPFSSingleton.ipfs) IPFSSingleton.setIPFS('http://localhost:5001');
    const ipfs = IPFSSingleton.ipfs!;

    try {
        const data = yield* call([ipfs, ipfs.block.get], cid, options);
        //Redux Cache
        const content = yield* select(selectByIdSingle, cid.toString());
        if (!content) yield* put(create({ contentId: cid.toString(), data, type: IPFSDataType.Raw }));
        else if (!content?.data) yield* put(update({ contentId: cid.toString(), data, type: IPFSDataType.Raw }));
    } catch (error) {
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                type: BLOCK_GET_ERROR,
            }),
        );
    }
}

export default blockGet;
