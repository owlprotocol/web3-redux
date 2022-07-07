import { BaseSyncId, Sync, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const BlockCRUD = createCRUDModel<'Sync', BaseSyncId, Sync>('Sync', validateId, validate);
export default BlockCRUD;
