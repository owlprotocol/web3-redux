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
            index: [],
        },
        {
            name: 'blockHash',
            index: [],
        },
        {
            name: 'logIndex',
            index: [],
        },
        {
            name: 'blockNumber',
            index: [],
        },
        {
            name: 'address',
            index: [],
        },
        {
            name: 'name',
            index: [],
        },
        {
            name: 'data',
            index: [],
        },
        {
            name: 'topics',
            index: [],
        },
        {
            name: 'returnValues',
            index: [],
        },
        {
            name: 'returnValuesIndexKeys',
            index: [],
        },
        {
            name: 'indexIds',
            index: [],
        },
        {
            name: 'contractId',
            index: [],
        },
    ],
};

export default ContractEventDBModel;
