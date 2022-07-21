import { v4 as uuidv4 } from 'uuid';
import { createAction } from '../../utils/createAction.js';
import { name } from '../common.js';

/** @internal */
export const SEND = `${name}/SEND`;
/** @internal */
export interface SendActionInput {
    networkId?: string;
    address?: string;
    method?: string;
    args?: any[];
    from?: string;
    gasPrice?: string;
    gas?: string;
    value?: string;
}
/** @category Actions */
export const send = createAction(SEND, (payload: SendActionInput, uuid?: string) => {
    return {
        payload: payload,
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type SendAction = ReturnType<typeof send>;
/** @internal */
export const isSendAction = send.match;

export default send;
