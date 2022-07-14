import { IndexableTypeArrayReadonly } from 'dexie';

export function valuesDeterministic(item: Record<string, any>) {
    return Object.keys(item)
        .sort()
        .map((k) => item[k]);
}

/* Compound indices are joined with separator */
export const SEPARATOR = '-';
export function toReduxOrmId(id: string | IndexableTypeArrayReadonly) {
    if (typeof id === 'string') return id;
    console.debug(id);
    return id.join(SEPARATOR);
}

export default toReduxOrmId;
