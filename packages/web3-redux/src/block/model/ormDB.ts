// eslint-disable-next-line import/no-unresolved
import { Model } from 'indexeddb-orm';
import { name } from '../common.js';

export class BlockDBModel extends Model {
    static TableName = name;
}

export const settings = {
    name, //name of table
    primary: 'id', //auto increment field (default id)
    ormClass: BlockDBModel,
    columns: [
        {
            name: 'number', //other indexes in the database
            index: [],
        },
        {
            name: 'networkId',
            index: [],
        },
    ],
};

export default BlockDBModel;
