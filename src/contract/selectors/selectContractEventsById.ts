import { createSelector } from 'redux-orm';
import { getOrm } from '../../orm';
import { ContractEvent, ReturnValues } from '../../contractevent/model';
import { memoizedLodashFilter } from '../../memo';
import { BaseWeb3Contract, IdArgs, getId } from '../model/interface';

//Events
type selectContractEventsById = (state: any, id: string | undefined) => ContractEvent[] | null;
export const selectContractEventsById: selectContractEventsById = createSelector(getOrm().Contract.events);

const contractEventSelect = createSelector(
    getOrm(),
    selectContractEventsById,
    (_1: any, _2: string, eventName: string) => eventName,
    (_1: any, _2: string, _3: string, returnValuesFilter?: { [key: string]: any }) => returnValuesFilter,
    (
        session: any,
        events: ReturnType<selectContractEventsById>,
        eventName: string,
        returnValuesFilter?: { [key: string]: any },
    ) => {
        if (!events) return undefined;

        //TODO: Index by name to memoize changes by events as well
        //Memoize filter by name
        const filteredByName = memoizedLodashFilter(events, { name: eventName });
        if (!returnValuesFilter) return filteredByName;

        return memoizedLodashFilter(filteredByName, { returnValues: returnValuesFilter });
    },
);

export function selectContractEventsByIdFiltered<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['events'] = string,
    U extends ReturnValues = ReturnValues,
>(
    state: any,
    idArgs: IdArgs | undefined,
    eventName: K | undefined,
    returnValuesFilter?: { [key: string]: any },
): ContractEvent<U>[] | undefined {
    if (!idArgs) return undefined;
    const id = getId(idArgs);
    return contractEventSelect(state, id, eventName, returnValuesFilter);
}

export function selectEventsFactory<
    T extends BaseWeb3Contract = BaseWeb3Contract,
    K extends keyof T['events'] = string,
    U extends ReturnValues = ReturnValues,
>(eventName: K) {
    return (state: any, id: IdArgs | undefined, filter?: any): U[] | undefined => {
        return selectContractEventsByIdFiltered<T, K, U>(state, id, eventName, filter) as U[] | undefined;
    };
}

export default selectContractEventsByIdFiltered;
