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
            index: 'networkId',
        },
        {
            name: 'to',
            index: 'to',
        },
        {
            name: 'data',
            index: 'data',
        },
        {
            name: 'defaultBlock',
            index: 'defaultBlock',
        },
        {
            name: 'from',
            index: 'from',
        },
        {
            name: 'gas',
            index: 'gas',
        },
        {
            name: 'returnValue',
            index: 'returnValue',
        },
        {
            name: 'error',
            index: 'error',
        },
        {
            name: 'lastUpdated',
            index: 'lastUpdated',
        },
        {
            name: 'status',
            index: 'status',
        },
    ],
};

export default EthCallDBModel;
