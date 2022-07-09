import { EventData } from 'web3-eth-contract';
import { validateId } from './interface.js';
import toReduxOrmId from '../../utils/toReduxORMId.js';

export interface EventSubscription {
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
}
export function eventSubscriptionHash(subscription: EventSubscription): string {
    const cId = toReduxOrmId(validateId({ networkId: subscription.networkId, address: subscription.address }));
    let id = `${cId}-${subscription.eventName}`;
    if (subscription.filter) id = `${id}-${JSON.stringify(subscription.filter)}`;
    return id;
}

export function eventId(event: EventData): string {
    return `${event.transactionHash}-${event.transactionIndex}`;
}
