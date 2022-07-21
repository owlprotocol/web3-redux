import { call, put, select } from 'typed-redux-saga';
import { AddAction, ADD } from '../actions/index.js';
import { create as createError } from '../../error/actions/index.js';
import { IPFSDataType } from '../model/interface.js';
import IPFSCacheCRUD from '../crud.js';
import loadConfig from '../../config/sagas/loadConfig.js';

const ADD_ERROR = `${ADD}/ERROR`;
/** @category Sagas */
export function* add(action: AddAction) {
    const { payload } = action;
    const { file, options } = payload;

    const config = yield* call(loadConfig);
    const { ipfsClient: ipfs } = config ?? {};
    if (!ipfs) throw new Error('ipfClient undefined');

    try {
        const { cid } = yield* call([ipfs, ipfs.add], file, options);
        yield* put(IPFSCacheCRUD.actions.upsert({ contentId: cid.toString(), data: file, type: IPFSDataType.File }));
    } catch (error) {
        const err = error as Error;
        yield* put(
            createError(
                {
                    id: action.meta.uuid,
                    errorMessage: err.message,
                    stack: err.stack,
                    type: ADD_ERROR,
                },
                action.meta.uuid,
            ),
        );
    }
}

export default add;
