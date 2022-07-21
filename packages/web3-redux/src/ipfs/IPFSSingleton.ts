import type { IPFS } from 'ipfs';
import { create } from 'ipfs-http-client';
import { encode as encodeJSON, decode as decodeJSON, code as codeJSON } from '@ipld/dag-json';
import { encode as encodeCBOR, decode as decodeCBOR, code as codeCBOR } from '@ipld/dag-cbor';
import { CID } from 'multiformats';
import { sha256 } from 'multiformats/hashes/sha2';

interface PutOptions {
    version?: 0 | 1;
    format?: 'dag-cbor' | 'dag-json'; //dag-json only used in testing, not in production
    pin?: boolean;
}

export class IPFSSingleton {
    static readonly ipfs: IPFS | undefined;
    static _totalNetworkPut = 0;
    static _totalNetworkGet = 0;
    static readonly local: { [key: string]: any } = {};

    private constructor() {}
    public static setIPFS(ipfs: IPFS | string) {
        if (typeof ipfs === 'string') {
            //@ts-expect-error
            this.ipfs = create({ url: ipfs });
        } else {
            //@ts-expect-error
            this.ipfs = ipfs;
        }
    }

    //PUT
    public static async put(data: Uint8Array, options: PutOptions) {
        if (this.ipfs) return this.ipfs.block.put(data, options);

        //Mock IPFS Storage
        const digest = await sha256.digest(data);
        let cid: CID | undefined;
        if (!options || options.version == 0) {
            //dag-pb
            cid = CID.create(0, 112, digest);
        } else if (options.format == 'dag-json') {
            cid = CID.create(1, codeJSON, digest);
        } else if (options.format == 'dag-cbor') {
            cid = CID.create(1, codeCBOR, digest);
        }

        if (!cid) throw Error(`${cid} cid put(${data}) - ${options}`);
        this.local[cid!.toString()] = data;
        return cid!;
    }

    /**
     * Default optiosn for dag-json payload
     * @param rec
     * @param options Options override
     * @returns cid
     */
    public static async putJSON(rec: Record<string, any>, options?: PutOptions) {
        const data = encodeJSON(rec);
        return IPFSSingleton.put(data, { ...options, version: 1, format: 'dag-json' });
    }

    public static async putCBOR(rec: Record<string, any>, options?: PutOptions) {
        const data = encodeCBOR(rec);
        return IPFSSingleton.put(data, { ...options, version: 1, format: 'dag-cbor' });
    }

    //GET
    static async get(cid: CID): Promise<Uint8Array> {
        if (!cid) throw Error(`${cid} invalid`);

        let v: Uint8Array;
        if (this.ipfs) v = await this.ipfs.block.get(cid);
        else v = this.local[cid.toString()];

        if (!v) throw new Error(`${cid} not found!`);
        return v;
    }

    static async getJSON(cid: CID): Promise<Record<string, any>> {
        const data = await IPFSSingleton.get(cid);
        return decodeJSON(data);
    }

    static async getCBOR(cid: CID): Promise<Record<string, any>> {
        const data = await IPFSSingleton.get(cid);
        return decodeCBOR(data);
    }
}

export default IPFSSingleton;
