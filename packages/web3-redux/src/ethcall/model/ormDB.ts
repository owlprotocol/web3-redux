// eslint-disable-next-line import/no-unresolved
import { Model } from 'indexeddb-orm';
import { name } from '../common.js';

export class EthCallDBModel extends Model {
    static TableName = name;
}

export const settings = {
    name,
    primary: 'id',
    ormClass: EthCallDBModel,
    columns: [
        {
            name: 'networkId',
            index: [],
        },
        {
            name: 'to',
            index: [],
        },
        {
            name: 'data',
            index: [],
        },
        {
            name: 'defaultBlock',
            index: [],
        },
        {
            name: 'from',
            index: [],
        },
        {
            name: 'gas',
            index: [],
        },
        {
            name: 'returnValue',
            index: [],
        },
        {
            name: 'error',
            index: [],
        },
        {
            name: 'lastUpdated',
            index: [],
        },
        {
            name: 'status',
            index: [],
        },
    ],
};

export default EthCallDBModel;
