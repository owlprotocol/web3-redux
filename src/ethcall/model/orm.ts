import { attr, Model as ORMModel } from 'redux-orm';
import { name } from '../common';

export default class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = name;

    static fields = {
        id: attr(),
        networkId: attr(),
        address: attr(),
        data: attr(),
        defaultBlock: attr(),
        from: attr(),
        gas: attr(),
        returnValue: attr(),
    };
}
