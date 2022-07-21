import type { IPFS } from 'ipfs';
import { v4 as uuidv4 } from 'uuid';
import { createAction } from '../../utils/createAction.js';
import { name } from '../common.js';

export interface AddAllPayload {
    files: Parameters<IPFS['addAll']>[0];
    options?: Parameters<IPFS['addAll']>[1];
}

/** @internal */
export const ADD_ALL = `${name}/ADD_ALL`;
/** @category Actions */
export const addAll = createAction(ADD_ALL, (payload: AddAllPayload, uuid?: string) => {
    return {
        payload,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type AddAllAction = ReturnType<typeof addAll>;
/** @internal */
export const isAddAllAction = addAll.match;

export default addAll;
