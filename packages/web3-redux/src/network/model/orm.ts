import { attr, Model as ORMModel } from 'redux-orm';
import { name } from '../common.js';

export default class Model extends ORMModel {
    static options = {
        idAttribute: 'networkId',
    };

    static modelName = name;

    static fields = {
        networkId: attr(),
        web3: attr(),
        web3Sender: attr(),
        multicallAddress: attr(),
        multicallContract: attr(),
        gasLimit: attr(),
        explorerUrl: attr(),
        explorerApiUrl: attr(),
        explorerApiKey: attr(),
        ens: attr(),
    };
}
