import { HTTPCacheId, HTTPCache } from './interface.js';
import { isUndefined, omitBy } from '../../utils/lodash/index.js';

/** @internal */
export function validateId({ id }: HTTPCacheId): HTTPCacheId {
    return { id };
}

/** @internal */
export function toPrimaryKey({ id }: HTTPCacheId): string {
    return id;
}

/** @internal */
export function validate(item: HTTPCache): HTTPCache {
    return omitBy(item, isUndefined) as unknown as HTTPCache;
}
