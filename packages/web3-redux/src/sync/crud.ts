import { BaseSyncId, Sync, SyncIndexInput } from './model/index.js';
import { name } from './common.js';
import { createCRUDModel } from '../crud/createCRUDModel.js';

export const SyncCRUD = createCRUDModel<typeof name, BaseSyncId, Sync, Sync, SyncIndexInput>(name);
export default SyncCRUD;
