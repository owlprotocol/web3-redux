import { attr, fk, Model as ORMModel } from 'redux-orm';
import { name } from '../common';

export default class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = name;

    static fields = {
        id: attr(),
        networkId: fk({ to: 'Network', as: 'network' }),
        account: attr(),
    };
}
