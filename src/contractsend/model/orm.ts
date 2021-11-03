import { fk, attr, Model as ORMModel } from 'redux-orm';
import { name } from '../common';

export default class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = name;

    static fields = {
        id: attr(),
        address: attr(),
        methodName: attr(),
        args: attr(),
        from: attr(),
        value: attr(),
        transactionHash: attr(),
        transactionId: fk({ to: 'Transaction', as: 'transaction' }),
        status: attr(),
        error: attr(),
    };
}
