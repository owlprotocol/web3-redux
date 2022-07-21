import { IndexableType } from 'dexie';

export function valuesDeterministic(item: Record<string, any>) {
    return Object.keys(item)
        .sort()
        .map((k) => item[k]);
}

/* Compound indices are joined with separator */
export const SEPARATOR = '-';
export function toReduxOrmId(id: IndexableType) {
    if (typeof id === 'string') return id;
    else if (Array.isArray(id)) return id.join(SEPARATOR);
    return JSON.stringify(id);
}

export default toReduxOrmId;
