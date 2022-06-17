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
            index: 'name',
        },
        {
            name: 'currency',
            index: 'currency',
        },
        {
            name: 'web3Rpc',
            index: 'web3Rpc',
        },
        {
            name: 'multicallAddress',
            index: 'multicallAddress',
        },
        {
            name: 'multicallContract',
            index: 'multicallContract',
        },
        {
            name: 'gasLimit',
            index: 'gasLimit',
        },
        {
            name: 'latestBlockNumber',
            index: 'latestBlockNumber',
        },
        {
            name: 'explorerUrl',
            index: 'explorerUrl',
        },
        {
            name: 'explorerApiUrl',
            index: 'explorerApiUrl',
        },
        {
            name: 'explorerApiKey',
            index: 'explorerApiKey',
        },
    ],
};

export default NetworkDBModel;
