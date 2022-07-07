import { Axios } from 'axios';

export interface ConfigId {
    /* Id in store. Default is 0. */
    readonly id: string;
}

/** A global singleton config object.
 * Can be extended to store any key-value pairs.
 */
export interface Config extends ConfigId {
    /* Selected blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks.
     */
    readonly networkId?: string | undefined;
    /* Selected account */
    readonly account?: string | undefined;
    /* API URLs */
    /* IPFS Url */
    readonly ipfsUrl?: string | undefined;
    /* 4byte.directory Url */
    readonly _4byteUrl?: string | undefined;
    /* API Clients */
    /* IPFS Client */
    readonly ipfsClient?: Axios;
    /* 4byte.directory Client */
    readonly _4byteClient?: Axios;
    /* CORS Proxy */
    readonly corsProxy?: string;
    /* HTTP Client */
    readonly httpClient?: Axios;
    /* Arbitrary config values */
    readonly [key: string]: any;
}

export const ConfigIndex = 'id';

/** @internal */
export function validateId(item: ConfigId) {
    return item.id;
}

/** @internal */
export function validate(item: Config): Config {
    return item;
}

export default Config;