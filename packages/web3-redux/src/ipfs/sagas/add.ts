import { call, put, select } from 'typed-redux-saga';
import IPFSSingleton from '../IPFSSingleton.js';
import { createAction, AddAction, ADD, updateAction } from '../actions/index.js';
import { create as createError } from '../../error/actions/index.js';
import { selectByIdSingle } from '../selectors/index.js';
import { IPFSDataType } from '../model/interface.js';

const ADD_ERROR = `${ADD}/ERROR`;
/** @category Sagas */
export function* add(action: AddAction) {
    const { payload } = action;
    const { file, options } = payload;

    if (!IPFSSingleton.ipfs) IPFSSingleton.setIPFS('http://localhost:5001');
    const ipfs = IPFSSingleton.ipfs!;

    try {
        const { cid } = yield* call([ipfs, ipfs.add], file, options);
        //Redux Cache
        const content = yield* select(selectByIdSingle, cid.toString());
        if (!content) yield* put(createAction({ contentId: cid.toString(), data: file, type: IPFSDataType.File }));
        else if (!content?.data)
            yield* put(updateAction({ contentId: cid.toString(), data: file, type: IPFSDataType.File }));
    } catch (error) {
        yield* put(
            createError({
                id: action.meta.uuid,
                error: error as Error,
                errorMessage: (error as Error).message,
                type: ADD_ERROR,
            }),
        );
    }
}

export default add;
