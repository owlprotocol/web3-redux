import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';

export const UNSUBSCRIBE = `${name}/UNSUBSCRIBE`;

export const unsubscribe = createAction<string>(UNSUBSCRIBE);
export type UnsubscribeAction = ReturnType<typeof unsubscribe>;
export const isUnsubscribeAction = unsubscribe.match;

export default unsubscribe;
