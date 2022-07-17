import { name } from './common.js';
import { HTTPCacheId, Http } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const HTTPCacheCRUD = createCRUDModel<typeof name, HTTPCacheId, Http, Http, Http>(name);
export default HTTPCacheCRUD;
