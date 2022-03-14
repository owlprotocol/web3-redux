export interface LogsSubscription {
    networkId: string;
    address?: string | string[];
    topics?: (null | string | string[])[];
}

export function getLogsSubscriptionId({ networkId, address, topics }: LogsSubscription) {
    return [networkId, address, JSON.stringify(topics)].join('-');
}

export default LogsSubscription;
