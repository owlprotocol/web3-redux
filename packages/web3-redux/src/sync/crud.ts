import { BaseSyncId, Sync, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const SyncCRUD = createCRUDModel<'Sync', BaseSyncId, Sync>('Sync', validateId, validate);
export default SyncCRUD;
