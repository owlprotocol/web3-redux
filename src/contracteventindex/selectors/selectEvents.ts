import { createSelector } from 'redux-orm';
import ContractEvent from '../../contractevent/model/interface';
import { getOrm } from '../../orm';
import memoizeArrayByRef from '../../utils/memo/memoizeArrayByRef';

const selector = createSelector(getOrm().ContractEventIndex.events);

function selectEvents(state: any, id: string | undefined): ContractEvent[] | undefined {
    return memoizeArrayByRef(selector(state, id));
}

export default selectEvents;
