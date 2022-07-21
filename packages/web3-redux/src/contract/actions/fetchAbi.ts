import { createAction } from '../../utils/createAction.js';
import { v4 as uuidv4 } from 'uuid';

import { name } from '../common.js';
import { ContractId } from '../model/interface.js';

/** @internal */
export const FETCH_ABI = `${name}/FETCH_ABI`;
/** @category Actions */
export const fetchAbi = createAction(FETCH_ABI, (payload: ContractId, uuid?: string) => {
    return {
        payload: { networkId: payload.networkId, address: payload.address.toLowerCase() },
        meta: { uuid: uuid ?? uuidv4() },
    };
});
/** @internal */
export type FetchAbiAction = ReturnType<typeof fetchAbi>;
/** @internal */
export const isFetchAbiAction = fetchAbi.match;

export default fetchAbi;
