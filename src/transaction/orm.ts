import { attr, fk, Model as ORMModel } from 'redux-orm';

export default class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = 'Transaction';

    static fields = {
        hash: attr(),
        networkId: fk({ to: 'Network', as: 'network', relatedName: 'transactions' }),
        blockId: fk({ to: 'Block', as: 'block', relatedName: 'transactions' }),
    };
}
