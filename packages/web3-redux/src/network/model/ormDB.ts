// eslint-disable-next-line import/no-unresolved
import { Model } from 'indexeddb-orm';
import { name } from '../common.js';

export class NetworkDBModel extends Model {
    static TableName = name;
}

export const settings = {
    name, //name of table
    primary: 'networkId', //auto increment field (default id)
    ormClass: NetworkDBModel,
    columns: [
        {
            name: 'name',
            index: [],
        },
        {
            name: 'currency',
            index: [],
        },
        {
            name: 'web3Rpc',
            index: [],
        },
        {
            name: 'multicallAddress',
            index: [],
        },
        {
            name: 'multicallContract',
            index: [],
        },
        {
            name: 'gasLimit',
            index: [],
        },
        {
            name: 'latestBlockNumber',
            index: [],
        },
        {
            name: 'explorerUrl',
            index: [],
        },
        {
            name: 'explorerApiUrl',
            index: [],
        },
        {
            name: 'explorerApiKey',
            index: [],
        },
    ],
};

export default NetworkDBModel;
