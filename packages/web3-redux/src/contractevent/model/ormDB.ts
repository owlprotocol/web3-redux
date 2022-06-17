// eslint-disable-next-line import/no-unresolved
import { Model } from 'indexeddb-orm';
import { name } from '../common.js';

export class ContractEventDBModel extends Model {
    static TableName = name;
}

export const settings = {
    name, //name of table
    primary: 'id', //auto increment field (default id)
    ormClass: ContractEventDBModel,
    columns: [
        {
            name: 'networkId', //other indexes in the database
            index: 'networkId',
        },
        {
            name: 'blockHash',
            index: 'blockHash',
        },
        {
            name: 'logIndex',
            index: 'logIndex',
        },
        {
            name: 'blockNumber',
            index: 'blockNumber',
        },
        {
            name: 'address',
            index: 'address',
        },
        {
            name: 'name',
            index: 'name',
        },
        {
            name: 'data',
            index: 'data',
        },
        {
            name: 'topics',
            index: 'topics',
        },
        {
            name: 'returnValues',
            index: 'returnValues',
        },
        {
            name: 'returnValuesIndexKeys',
            index: 'returnValuesIndexKeys',
        },
        {
            name: 'indexIds',
            index: 'indexIds',
        },
        {
            name: 'contractId',
            index: 'contractId',
        },
    ],
};

export default ContractEventDBModel;
