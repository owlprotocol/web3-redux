import { name } from './common.js';
import { IpfsId, Ipfs, validateId, validate } from './model/index.js';
import createCRUDModel from '../createCRUDModel.js';

export const IPFSCacheCRUD = createCRUDModel<'Ipfs', IpfsId, Ipfs>(name, validateId, validate);
export default IPFSCacheCRUD;
