import { createSelector } from 'redux-orm';
import ContractEvent from '../../contractevent/model/interface';
import { getOrm } from '../../orm';

const selectEvents = createSelector(getOrm().ContractEventIndex.events) as (
    state: any,
    id: string | undefined,
) => ContractEvent[] | undefined;

export default selectEvents;
