import { name } from './common.js';
import { BlockId, BlockTransaction } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const BlockCRUD = createCRUDModel<typeof name, BlockId, BlockTransaction, BlockTransaction>(name);
export default BlockCRUD;
