// eslint-disable-next-line import/no-unresolved
import { Model } from 'indexeddb-orm';
import { name } from '../common.js';

export class IPFSDBModel extends Model {
    static TableName = name;
}

export const settings = {
    name,
    primary: 'contentId',
    ormClass: IPFSDBModel,
    columns: [
        {
            name: 'data',
            index: 'data',
        },
        {
            name: 'type',
            index: 'type',
        },
    ],
};

export default IPFSDBModel;
