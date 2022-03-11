import { createSelector } from 'redux-orm';
import { filter } from 'lodash';
import { getOrm } from '../../orm.js';
import { ContractEvent, ReturnValues } from '../../contractevent/model/index.js';
import { selectEvents, selectByIdSingle as selectEventIndex } from '../../contracteventindex/selectors/index.js';
import { BaseWeb3Contract, ContractId } from '../model/interface.js';

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
        if (!!selectEventIndex(state, indexId)) {
            return (selectEvents(state, indexId) as ContractEvent<U>[] | undefined) ?? EMPTY_EVENTS;
        } else {
            //No index, used lodash filter
            const events = selectEvents(state, baseIndexId) as ContractEvent<U>[] | undefined;
            if (!events) return EMPTY_EVENTS;
            const eventsFiltered = filter(events, { returnValues: returnValuesFilter });

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

export const selectContractEvents = selectContractEventsByIdFiltered;
export default selectContractEvents;
