import { createAction } from '@reduxjs/toolkit';
import { isCID } from '../../utils';
import { name } from '../common';

/** @internal */
export const OBJECT_GET = `${name}/OBJECT/GET`;
/** @category Actions */
export const objectGet = createAction(OBJECT_GET, (payload: string) => {
    isCID(payload);
    return { payload };
});
/** @internal */
export type ObjectGetAction = ReturnType<typeof objectGet>;
/** @internal */
export const isObjectGetAction = objectGet.match;

export default objectGet;
