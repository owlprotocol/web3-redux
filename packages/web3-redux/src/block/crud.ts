import { name } from './common.js';
import { BlockId, BlockTransaction, toPrimaryKey, validateId } from './model/index.js';
import createCRUDModel from '../crud/createCRUDModel.js';

export const BlockCRUD = createCRUDModel<typeof name, BlockId, BlockTransaction, BlockTransaction>(name, {
    validateId,
    toPrimaryKey,
});
export default BlockCRUD;
