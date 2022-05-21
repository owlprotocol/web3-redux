import { fk, attr, Model as ORMModel } from 'redux-orm';
import { name } from '../common.js';

export default class Model extends ORMModel {
    static options = {
        idAttribute: 'uuid',
    };

    static modelName = name;

    static fields = {
        uuid: attr(),
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
