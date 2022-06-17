// eslint-disable-next-line import/no-unresolved
import { Model } from 'indexeddb-orm';
import { name } from '../common.js';

export class HttpDBModel extends Model {
    static TableName = name;
}

export const settings = {
    name,
    primary: 'id',
    ormClass: HttpDBModel,
    columns: [
        {
            name: 'url',
            index: 'url',
        },
        {
            name: 'data',
            index: 'data',
        },
        {
            name: 'corsProxied',
            index: 'corsProxied',
        },
    ],
};

export default HttpDBModel;
