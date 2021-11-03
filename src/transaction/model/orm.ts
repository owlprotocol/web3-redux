import { fk, attr, Model as ORMModel } from 'redux-orm';
import { name } from '../common';

export default class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = name;

    static fields = {
        id: attr(),
        networkId: fk({ to: 'Network', as: 'network', relatedName: 'transactions' }),
        hash: attr(),
        nonce: attr(),
        blockHash: attr(),
        blockNumber: attr(),
        transactionIndex: attr(),
        from: attr(),
        to: attr(),
        value: attr(),
        gasPrice: attr(),
        gas: attr(),
        input: attr(),
        blockId: fk({ to: 'Block', as: 'block', relatedName: 'transactions' }),
        receipt: attr(),
        confirmations: attr(),
    };
}
