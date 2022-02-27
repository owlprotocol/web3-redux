import { Axios } from 'axios';
import { IPFSHTTPClient } from 'ipfs-http-client';

/** A global singleton config object.
 * Can be extended to store any key-value pairs.
 */
export interface Config {
    /* Id in store. Default is 0. */
    readonly id: string;
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
    readonly ipfsClient?: IPFSHTTPClient;
    /* 4byte.directory Client */
    readonly _4byteClient?: Axios;
    /* Arbitrary config values */
    readonly [key: string]: any;
}

export default Config;
