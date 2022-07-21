import { createAction } from '../../utils/createAction.js';
import { v4 as uuidv4 } from 'uuid';

import { name } from '../common.js';
import { ContractId } from '../model/interface.js';

/** @internal */
export const GET_NONCE = `${name}/GET_NONCE`;
/** @category Actions */
export const getNonce = createAction(GET_NONCE, (payload: ContractId, uuid?: string) => {
    return {
        payload: { networkId: payload.networkId, address: payload.address.toLowerCase() },
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type GetNonceAction = ReturnType<typeof getNonce>;
/** @internal */
export const isGetNonceAction = getNonce.match;

export default getNonce;
