import { BaseSyncId, Sync, validateId, validate } from './model/index.js';
import { name } from './common.js';
import createCRUDModel from '../createCRUDModel.js';

export const SyncCRUD = createCRUDModel<typeof name, BaseSyncId, Sync>(name, validateId, validate);
export default SyncCRUD;
