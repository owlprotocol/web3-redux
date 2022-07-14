import { EventData } from 'web3-eth-contract';
import { validateId, toPrimaryKey } from './interface.js';
import toReduxOrmId from '../../utils/toReduxORMId.js';

export interface EventSubscription {
    networkId: string;
    address: string;
    eventName: string;
    filter?: { [key: string]: any };
}
export function eventSubscriptionHash(subscription: EventSubscription): string {
    const { networkId, address } = validateId({ networkId: subscription.networkId, address: subscription.address });
    const cId = toReduxOrmId(toPrimaryKey({ networkId, address }));
    let id = `${cId}-${subscription.eventName}`;
    if (subscription.filter) id = `${id}-${JSON.stringify(subscription.filter)}`;
    return id;
}

export function eventId(event: EventData): string {
    return `${event.transactionHash}-${event.transactionIndex}`;
}
