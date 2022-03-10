import { createAction } from '@reduxjs/toolkit';
import { name } from '../common.js';

/** @internal */
export const SEND = `${name}/SEND`;
/** @internal */
export interface SendActionInput {
    networkId: string;
    address: string;
    method: string;
    args?: any[];
    from: string;
    gasPrice?: string;
    gas?: string;
    value?: string;
}
/** @category Actions */
export const send = createAction<SendActionInput>(SEND);
/** @internal */
export type SendAction = ReturnType<typeof send>;
/** @internal */
export const isSendAction = send.match;

export default send;
