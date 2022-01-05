import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';
import { TransactionId } from '../model/interface';

/** @internal */
export const FETCH = `${name}/FETCH`;
/** @category Actions */
export const fetch = createAction<TransactionId>(FETCH);

/** @internal */
export type FetchAction = ReturnType<typeof fetch>;
/** @internal */
export const isFetchAction = fetch.match;

export default fetch;
