import { name } from './common.js';
import { EthCallId, EthCall, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const EthCallCRUD = createCRUDModel<EthCallId, EthCall, 'EthCall'>(name, validateId, validate);
export default EthCallCRUD;
