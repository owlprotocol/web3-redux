import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';

/** @internal */
export const UNSUBSCRIBE = `${name}/UNSUBSCRIBE`;
/** @category Actions */
export const unsubscribe = createAction<string>(UNSUBSCRIBE);
/** @internal */
export type UnsubscribeAction = ReturnType<typeof unsubscribe>;
/** @internal */
export const isUnsubscribeAction = unsubscribe.match;

export default unsubscribe;
