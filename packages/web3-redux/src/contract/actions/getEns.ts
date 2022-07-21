import { v4 as uuidv4 } from 'uuid';
import { createAction } from '../../utils/createAction.js';

import { name } from '../common.js';
import { ContractId } from '../model/interface.js';

/** @internal */
export const GET_ENS = `${name}/GET_ENS`;
/** @category Actions */
export const getEns = createAction(GET_ENS, (payload: ContractId, uuid?: string) => {
    return {
        payload: { networkId: payload.networkId, address: payload.address.toLowerCase() },
        meta: {
            uuid: uuid ?? uuidv4(),
        },
    };
});
/** @internal */
export type GetEnsAction = ReturnType<typeof getEns>;
/** @internal */
export const isGetEnsAction = getEns.match;

export default getEns;
