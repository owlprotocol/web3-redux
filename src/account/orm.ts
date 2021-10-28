import { attr, Model as ORMModel } from 'redux-orm';

export default class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = 'Account';

    static fields = {
        id: attr(),
        address: attr(),
        balance: attr(),
        nonce: attr(),
    };
}
