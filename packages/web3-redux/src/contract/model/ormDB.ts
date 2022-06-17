// eslint-disable-next-line import/no-unresolved
import { Model } from 'indexeddb-orm';
import { name } from '../common.js';

export class ContractDBModel extends Model {
    static TableName = name;
}

export const settings = {
    name, //name of table
    primary: 'id', //auto increment field (default id)
    ormClass: ContractDBModel,
    columns: [
        {
            name: 'address', //other indexes in the database
            index: 'address',
        },
        {
            name: 'networkId',
            index: 'networkId',
        },
        {
            name: 'abi',
            index: 'abi',
        },
        {
            name: 'indexIds',
            index: 'indexIds',
        },
    ],
};

export default ContractDBModel;
