import { createSelector } from 'redux-orm';
import ContractEvent from '../../contractevent/model/interface';
import { getOrm } from '../../orm';
import memoizeArrayByRef from '../../utils/memo/memoizeArrayByRef';

const selector = createSelector(getOrm().ContractEventIndex.events);

/** @category Selectors */
function selectEvents(state: any, id: string | undefined): ContractEvent[] | undefined {
    const result = selector(state, id);
    if (result) return memoizeArrayByRef(result);

    return undefined;
}

export default selectEvents;
