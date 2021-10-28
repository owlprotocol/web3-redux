import { attr, fk, Model as ORMModel } from 'redux-orm';

export default class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = 'ContractSend';

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
