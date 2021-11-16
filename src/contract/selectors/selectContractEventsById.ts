import { createSelector } from 'redux-orm';
import { getOrm } from '../../orm';
import { ContractEvent, ReturnValues } from '../../contractevent/model';
import { selectEvents } from '../../contracteventindex/selectors';
import { BaseWeb3Contract, IdArgs, getIdDeconstructed } from '../model/interface';

//Events
type selectContractEventsById = (state: any, id: string | undefined) => ContractEvent[] | null;
export const selectContractEventsById: selectContractEventsById = createSelector(getOrm().Contract.events);

const EMPTY_EVENTS: any[] = [];
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

    const { networkId, address } = getIdDeconstructed(idArgs);
    const index: any = { networkId, address, name: eventName };
    if (returnValuesFilter) index.returnValues = returnValuesFilter;
    const indexId = JSON.stringify(index);

    return (selectEvents(state, indexId) as ContractEvent<U>[] | undefined) ?? EMPTY_EVENTS;
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
