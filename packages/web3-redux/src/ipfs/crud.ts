import { name } from './common.js';
import { IpfsId, Ipfs } from './model/index.js';
import createCRUDModel from '../crud/createCRUDModel.js';

export const IPFSCacheCRUD = createCRUDModel<typeof name, IpfsId, Ipfs, Ipfs, Ipfs>(name);
export default IPFSCacheCRUD;
