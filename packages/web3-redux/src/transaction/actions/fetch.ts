import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';
import { TransactionId } from '../model/interface.js';

/** @internal */
export const FETCH = `${name}/FETCH`;
/** @category Actions */
export const fetchAction = createAction<TransactionId>(FETCH);

/** @internal */
export type FetchAction = ReturnType<typeof fetchAction>;
/** @internal */
export const isFetchAction = fetchAction.match;

export default fetchAction;
