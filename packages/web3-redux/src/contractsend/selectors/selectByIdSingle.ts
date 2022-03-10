import select from './select.js';
import { ContractSend, ContractSendId, getId } from '../model/interface.js';

/** @category Selectors */
function selectByIdSingle(state: any, id: ContractSendId | undefined): ContractSend | undefined {
    if (!id) return undefined;

    const idStr = getId(id);

    //@ts-ignore
    return select(state, idStr) as ContractSend | undefined;
}

export default selectByIdSingle;
