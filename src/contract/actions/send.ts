import { createAction } from '@reduxjs/toolkit';
import { name } from '../common';

export const SEND = `${name}/SEND`;
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
export const send = createAction<SendActionInput>(SEND);

export type SendAction = ReturnType<typeof send>;
export const isSendAction = send.match;

export default send;
