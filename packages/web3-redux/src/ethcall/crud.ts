import { name } from './common.js';
import { EthCallId, EthCall, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const EthCallCRUD = createCRUDModel<typeof name, EthCallId, EthCall>(name, validateId, validate);
export default EthCallCRUD;
