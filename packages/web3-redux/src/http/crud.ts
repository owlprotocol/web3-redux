import { name } from './common.js';
import { HTTPCacheId, Http, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const HTTPCacheCRUD = createCRUDModel<typeof name, HTTPCacheId, Http>(name, validateId, validate);
export default HTTPCacheCRUD;
