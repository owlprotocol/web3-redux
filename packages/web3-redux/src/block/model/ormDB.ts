// eslint-disable-next-line import/no-unresolved
import { Model } from 'indexeddb-orm';
import { name } from '../common.js';

export class BlockDBModel extends Model {
    static TableName = name;
}

export const settings = {
    name,
    primary: 'id',
    ormClass: BlockDBModel,
    columns: [
        { name: 'number', index: 'number' },
        { name: 'networkId', index: 'networkId' },
        { name: 'hash', index: 'hash' },
        { name: 'parentHash', index: 'parentHash' },
        { name: 'nonce', index: 'nonce' },
        { name: 'sha3Uncles', index: 'sha3Uncles' },
        { name: 'logsBloom', index: 'logsBloom' },
        { name: 'transactionRoot', index: 'transactionRoot' },
        { name: 'stateRoot', index: 'stateRoot' },
        { name: 'receiptRoot', index: 'receiptRoot' },
        { name: 'miner', index: 'miner' },
        { name: 'extraData', index: 'extraData' },
        { name: 'gasLimit', index: 'gasLimit' },
        { name: 'gasUsed', index: 'gasUsed' },
        { name: 'timestamp', index: 'timestamp' },
    ],
};

export default BlockDBModel;
