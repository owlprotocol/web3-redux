import { call, put, select } from 'typed-redux-saga';
import { AddAction, ADD } from '../actions/index.js';
import { create as createError } from '../../error/actions/index.js';
import { IPFSDataType } from '../model/interface.js';
import ConfigCRUD from '../../config/crud.js';
import IPFSCacheCRUD from '../crud.js';

const ADD_ERROR = `${ADD}/ERROR`;
/** @category Sagas */
export function* add(action: AddAction) {
    const { payload } = action;
    const { file, options } = payload;

    const config = yield* select(ConfigCRUD.selectors.selectByIdSingle, { id: '0' });
    const { ipfsClient: ipfs } = config ?? {};
    if (!ipfs) throw new Error('ipfClient undefined');

    try {
        const { cid } = yield* call([ipfs, ipfs.add], file, options);
        const content = yield* call(IPFSCacheCRUD.db.get, cid.toString());
        if (!content)
            yield* put(
                IPFSCacheCRUD.actions.create({ contentId: cid.toString(), data: file, type: IPFSDataType.File }),
            );
        else if (!content?.data)
            yield* put(
                IPFSCacheCRUD.actions.update({ contentId: cid.toString(), data: file, type: IPFSDataType.File }),
            );
    } catch (error) {
        const err = error as Error;
        yield* put(
            createError({
                id: action.meta.uuid,
                errorMessage: err.message,
                stack: err.stack,
                type: ADD_ERROR,
            }),
        );
    }
}

export default add;
