import { attr, fk, Model as ORMModel } from 'redux-orm';

export default class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = 'Block';

    static fields = {
        number: attr(),
        networkId: fk({ to: 'Network', as: 'network', relatedName: 'blocks' }),
    };
}
