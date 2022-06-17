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
            index: [],
        },
        {
            name: 'networkId',
            index: [],
        },
        {
            name: 'abi',
            index: [],
        },
        {
            name: 'indexIds',
            index: [],
        },
    ],
};

export default ContractDBModel;
