import { attr, fk, Model as ORMModel } from 'redux-orm';
import { Network } from '../network/model';

export interface Config {
    id: number;
    networkId?: string;
    account?: string;
}

export interface ConfigWithFk extends Config {
    network?: Network;
}

export class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = 'Config';

    static fields = {
        networkId: fk({ to: 'Network', as: 'network' }),
        account: attr(),
    };
}
