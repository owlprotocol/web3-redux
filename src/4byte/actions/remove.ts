import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { SignatureId } from '../model';

/** @internal */
export const REMOVE = `${name}/DELETE`;
/** @category Actions */
export const remove = createAction(REMOVE, (payload: SignatureId) => {
    return {
        payload: { signatureHash: payload.signatureHash },
    };
});
/** @internal */
export type RemoveAction = ReturnType<typeof remove>;
/** @internal */
export const isRemoveAction = remove.match;

export default remove;
