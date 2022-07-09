import { EventData } from 'web3-eth-contract';
import { toReduxOrmId } from '../../createCRUDModel.js';
import ContractCRUD from '../crud.js';

export interface EventSubscription {
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
}
export function eventSubscriptionHash(subscription: EventSubscription): string {
    const cId = toReduxOrmId(
        ContractCRUD.validateId({ networkId: subscription.networkId, address: subscription.address }),
    );
    let id = `${cId}-${subscription.eventName}`;
    if (subscription.filter) id = `${id}-${JSON.stringify(subscription.filter)}`;
    return id;
}

export function eventId(event: EventData): string {
    return `${event.transactionHash}-${event.transactionIndex}`;
}
