import { name } from './common.js';
import { NetworkId, Network, validate, hydrate, encode, NetworkWithObjects } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const NetworkCRUD = createCRUDModel<typeof name, NetworkId, Network, NetworkWithObjects>(name, {
    validate,
    hydrate,
    encode,
});
export default NetworkCRUD;
