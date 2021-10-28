import { attr, fk, Model as ORMModel } from 'redux-orm';

export default class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = 'Config';

    static fields = {
        networkId: fk({ to: 'Network', as: 'network' }),
        account: attr(),
    };
}
