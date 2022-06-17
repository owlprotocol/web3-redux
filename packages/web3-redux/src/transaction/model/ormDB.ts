// eslint-disable-next-line import/no-unresolved
import { Model } from 'indexeddb-orm';
import { name } from '../common.js';

export class TransactionDBModel extends Model {
    static TableName = name;
}

export const settings = {
    name,
    primary: 'id',
    ormClass: TransactionDBModel,
    columns: [
        {
            name: 'networkId',
            index: [],
        },
        {
            name: 'hash',
            index: [],
        },
        {
            name: 'nonce',
            index: [],
        },
        {
            name: 'blockHash',
            index: [],
        },
        {
            name: 'blockNumber',
            index: [],
        },
        {
            name: 'transactionIndex',
            index: [],
        },
        {
            name: 'from',
            index: [],
        },
        {
            name: 'to',
            index: [],
        },
        {
            name: 'value',
            index: [],
        },
        {
            name: 'gasPrice',
            index: [],
        },
        {
            name: 'gas',
            index: [],
        },
        {
            name: 'gasUsed',
            index: [],
        },
        {
            name: 'cumulativeGasUsed',
            index: [],
        },
        {
            name: 'effectiveGasPRice',
            index: [],
        },
        {
            name: 'input',
            index: [],
        },
        {
            name: 'receipt',
            index: [],
        },
        {
            name: 'confirmations',
            index: [],
        },
        {
            name: 'contractAddress',
            index: [],
        },
        {
            name: 'timeStamp',
            index: [],
        },
        {
            name: 'blockId',
            index: [],
        },
    ],
};

export default TransactionDBModel;
