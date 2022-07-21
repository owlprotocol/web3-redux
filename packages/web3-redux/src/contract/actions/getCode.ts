import { v4 as uuidv4 } from 'uuid';
import { createAction } from '../../utils/createAction.js';

import { name } from '../common.js';
import { ContractId } from '../model/interface.js';

/** @internal */
export const GET_CODE = `${name}/GET_CODE`;
/** @category Actions */
export const getCode = createAction(GET_CODE, (payload: ContractId, uuid?: string) => {
    return {
        payload: { networkId: payload.networkId, address: payload.address.toLowerCase() },
        meta: { uuid: uuid ?? uuidv4() },
    };
});
/** @internal */
export type GetCodeAction = ReturnType<typeof getCode>;
/** @internal */
export const isGetCodeAction = getCode.match;

export default getCode;
