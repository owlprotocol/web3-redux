import { IndexableTypeArray } from 'dexie';

/* Compound indices are joined with separator */
export const SEPARATOR = '-';
export function toReduxOrmId(id: string | IndexableTypeArray) {
    if (typeof id === 'string') return id;
    return id.join(SEPARATOR);
}

export default toReduxOrmId;
