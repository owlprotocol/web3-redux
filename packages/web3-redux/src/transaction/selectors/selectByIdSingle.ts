import select from './select.js';
import { Transaction, TransactionId, getId } from '../model/interface.js';

/** @category Selectors */
export function selectByIdSingle(state: any, id: TransactionId | undefined): Transaction | undefined {
    if (!id) return undefined;

    const idStr = getId(id);
    return select(state, idStr) as Transaction | undefined;
}

export default selectByIdSingle;
