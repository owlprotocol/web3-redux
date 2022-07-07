import { name } from './common.js';
import { NetworkId, Network, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const NetworkCRUD = createCRUDModel<NetworkId, Network, 'Network'>(name, validateId, validate);
export default NetworkCRUD;
