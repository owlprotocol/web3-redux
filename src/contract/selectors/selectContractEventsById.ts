import { createSelector } from 'redux-orm';
import { getOrm } from '../../orm';
import { ContractEvent, ReturnValues } from '../../contractevent/model';
import { selectEvents, selectByIdExists as selectEventIndexExists } from '../../contracteventindex/selectors';
import { BaseWeb3Contract, ContractId } from '../model/interface';
import { memoizedLodashFilter } from '../../memo';

//Events
type selectContractEventsById = (state: any, id: string | undefined) => ContractEvent[] | null;
/** @internal */
export const selectContractEventsById: selectContractEventsById = createSelector(getOrm().Contract.events);

const EMPTY_EVENTS: any[] = [];
/** @category Selectors */
export function selectContractEventsByIdFiltered<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['events'] = string,
    U extends ReturnValues = ReturnValues,
>(
    state: any,
    idArgs: ContractId | undefined,
    eventName: K | undefined,
    returnValuesFilter?: { [key: string]: any },
): ContractEvent<U>[] | undefined {
    if (!idArgs) return undefined;

    const { networkId, address } = idArgs;
    const baseIndex: any = { networkId, address, name: eventName };
    const baseIndexId = JSON.stringify(baseIndex);

    if (!returnValuesFilter) {
        //Base index is always created
        return (selectEvents(state, baseIndexId) as ContractEvent<U>[] | undefined) ?? EMPTY_EVENTS;
    } else {
        const index: any = { ...baseIndex, returnValues: returnValuesFilter };
        const indexId = JSON.stringify(index);
        if (selectEventIndexExists(state, indexId)) {
            return (selectEvents(state, indexId) as ContractEvent<U>[] | undefined) ?? EMPTY_EVENTS;
        } else {
            //No index, used lodash filter
            const events = selectEvents(state, baseIndexId) as ContractEvent<U>[] | undefined;
            if (!events) return EMPTY_EVENTS;
            const eventsFiltered = memoizedLodashFilter(events, { returnValues: returnValuesFilter });

            return eventsFiltered;
        }
    }
}

/** @category Selectors */
export function selectEventsFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['events'] = string,
    U extends ReturnValues = ReturnValues,
>(eventName: K) {
    return (state: any, id: ContractId | undefined, filter?: any): U[] | undefined => {
        return selectContractEventsByIdFiltered<T, K, U>(state, id, eventName, filter) as U[] | undefined;
    };
}

export default selectContractEventsByIdFiltered;
