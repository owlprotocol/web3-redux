import { createSelector } from 'redux-orm';
import { ContractEvent } from '../../contractevent/model/interface.js';
import { getOrm } from '../../orm.js';

const selector = createSelector(getOrm().ContractEventIndex.events);

/** @category Selectors */
export function selectEvents(state: any, id: string | undefined): ContractEvent[] | undefined {
    const result = selector(state, id) as ContractEvent[] | undefined;
    return result;
}

export default selectEvents;
