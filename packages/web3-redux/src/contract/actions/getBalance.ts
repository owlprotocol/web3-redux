import { v4 as uuidv4 } from 'uuid';
import { createAction } from '../../utils/createAction.js';

import { name } from '../common.js';
import { ContractId } from '../model/interface.js';

/** @internal */
export const GET_BALANCE = `${name}/GET_BALANCE`;
/** @category Actions */
export const getBalance = createAction(GET_BALANCE, (payload: ContractId, uuid?: string) => {
    return {
        payload: { networkId: payload.networkId, address: payload.address.toLowerCase() },
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type GetBalanceAction = ReturnType<typeof getBalance>;
/** @internal */
export const isGetBalanceAction = getBalance.match;

export default getBalance;
