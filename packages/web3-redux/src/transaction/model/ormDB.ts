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
            index: 'networkId',
        },
        {
            name: 'hash',
            index: 'hash',
        },
        {
            name: 'nonce',
            index: 'nonce',
        },
        {
            name: 'blockHash',
            index: 'blockHash',
        },
        {
            name: 'blockNumber',
            index: 'blockNumber',
        },
        {
            name: 'transactionIndex',
            index: 'transactionIndex',
        },
        {
            name: 'from',
            index: 'from',
        },
        {
            name: 'to',
            index: 'to',
        },
        {
            name: 'value',
            index: 'value',
        },
        {
            name: 'gasPrice',
            index: 'gasPrice',
        },
        {
            name: 'gas',
            index: 'gas',
        },
        {
            name: 'gasUsed',
            index: 'gasUsed',
        },
        {
            name: 'cumulativeGasUsed',
            index: 'cumulativeGasUsed',
        },
        {
            name: 'effectiveGasPrice',
            index: 'effectiveGasPrice',
        },
        {
            name: 'input',
            index: 'input',
        },
        {
            name: 'receipt',
            index: 'receipt',
        },
        {
            name: 'confirmations',
            index: 'confirmations',
        },
        {
            name: 'contractAddress',
            index: 'contractAddress',
        },
        {
            name: 'timeStamp',
            index: 'timeStamp',
        },
        {
            name: 'blockId',
            index: 'blockId',
        },
    ],
};

export default TransactionDBModel;
