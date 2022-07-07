import { name } from './common.js';
import { BlockId, BlockTransaction, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const BlockCRUD = createCRUDModel<BlockId, BlockTransaction, 'Block'>(name, validateId, validate);
export default BlockCRUD;
