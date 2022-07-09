import { Axios } from 'axios';
import type { IPFS } from 'ipfs';

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
    /* Arbitrary config values */
    //readonly [key: string]: any;
}

export interface ConfigWithObjects extends Config {
    /* IPFS Client */
    readonly ipfsClient?: IPFS;
    /* 4byte.directory Client */
    readonly _4byteClient?: Axios;
    /* CORS Proxy */
    readonly corsProxy?: string;
    /* HTTP Client */
    readonly httpClient?: Axios;
}

export default Config;
