import { Network } from '../network/model';

export interface Config {
    id: number;
    networkId?: string;
    account?: string;
}

export interface ConfigWithFk extends Config {
    network?: Network;
}
