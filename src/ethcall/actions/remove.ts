import { createAction } from '@reduxjs/toolkit';
import { toChecksumAddress } from 'web3-utils';
import { name } from '../common';
import { EthCallId } from '../model/interface';

/** @internal */
export const REMOVE = `${name}/DELETE`;
/** @category Actions */
export const remove = createAction(REMOVE, (payload: EthCallId) => {
    return {
        payload: {
            ...payload,
            to: toChecksumAddress(payload.to),
            from: payload.from ? toChecksumAddress(payload.from) : undefined,
        },
    };
});

/** @internal */
export type RemoveAction = ReturnType<typeof remove>;
/** @internal */
export const isRemoveAction = remove.match;

export default remove;
