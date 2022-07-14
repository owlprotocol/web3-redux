import { IndexableTypeArray } from 'dexie';

export function valuesDeterministic(item: Record<string, any>) {
    return Object.keys(item)
        .sort()
        .map((k) => item[k]);
}

/* Compound indices are joined with separator */
export const SEPARATOR = '-';
export function toReduxOrmId(id: string | IndexableTypeArray) {
    if (typeof id === 'string') return id;
    return id.join(SEPARATOR);
}

export default toReduxOrmId;
