import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { validate, SignatureId } from '../model';

/** @internal */
export const REMOVE = `${name}/DELETE`;
/** @category Actions */
export const remove = createAction(REMOVE, (payload: SignatureId) => {
    return {
        payload: validate(payload),
    };
});
/** @internal */
export type RemoveAction = ReturnType<typeof remove>;
/** @internal */
export const isRemoveAction = remove.match;

export default remove;
