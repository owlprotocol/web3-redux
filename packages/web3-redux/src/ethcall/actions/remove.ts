import { createAction } from '@reduxjs/toolkit';
import { toChecksumAddress } from '../../utils/web3-utils/index.js';
import { name } from '../common.js';
import { EthCallId } from '../model/interface.js';

/** @internal */
export const REMOVE = `${name}/DELETE`;
/** @category Actions */
export const remove = createAction(REMOVE, (payload: EthCallId) => {
    return {
        payload: {
            ...payload,
            to: toChecksumAddress(payload.to.slice()),
            from: payload.from ? toChecksumAddress(payload.from.slice()) : undefined,
        },
    };
});

/** @internal */
export type RemoveAction = ReturnType<typeof remove>;
/** @internal */
export const isRemoveAction = remove.match;

export default remove;
