import { name } from './common.js';
import { NetworkId, Network, validateId, validate, hydrate, NetworkWithObjects } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const NetworkCRUD = createCRUDModel<'Network', NetworkId, Network, NetworkWithObjects>(
    name,
    validateId,
    validate,
    hydrate,
);
export default NetworkCRUD;
