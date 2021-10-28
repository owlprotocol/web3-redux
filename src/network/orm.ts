import { attr, Model as ORMModel } from 'redux-orm';

export default class Model extends ORMModel {
    static options = {
        idAttribute: 'networkId',
    };

    static modelName = 'Network';

    static fields = {
        networkId: attr(),
        web3: attr(),
        web3Sender: attr(),
        multicallAddress: attr(),
        multicallContract: attr(),
        gasLimit: attr(),
    };
}
