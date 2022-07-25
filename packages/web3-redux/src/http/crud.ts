import { name } from './common.js';
import { HTTPCacheId, HTTPCache, toPrimaryKey, validate, validateId } from './model/index.js';
import { createCRUDModel } from '../crud/createCRUDModel.js';

export const HTTPCacheCRUD = createCRUDModel<typeof name, HTTPCacheId, HTTPCache, HTTPCache, HTTPCache>(name, {
    validateId,
    toPrimaryKey,
    validate,
});
