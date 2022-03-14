import { createAction } from '@reduxjs/toolkit';
import { isCIDGuard } from '../../utils/index.js';
import { name } from '../common.js';

/** @internal */
export const CAT = `${name}/CAT`;
/** @category Actions */
export const cat = createAction(CAT, (payload: string) => {
    isCIDGuard(payload);
    return { payload };
});
/** @internal */
export type CatAction = ReturnType<typeof cat>;
/** @internal */
export const isCatAction = cat.match;

export default cat;
