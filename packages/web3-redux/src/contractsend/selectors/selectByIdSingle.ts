import select from './select';
import { ContractSend, ContractSendId, getId } from '../model/interface';

/** @category Selectors */
function selectByIdSingle(state: any, id: ContractSendId | undefined): ContractSend | undefined {
    if (!id) return undefined;

    const idStr = getId(id);

    //@ts-ignore
    return select(state, idStr) as ContractSend | undefined;
}

export default selectByIdSingle;
