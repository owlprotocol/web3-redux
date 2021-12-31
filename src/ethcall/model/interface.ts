import { toChecksumAddress } from 'web3-utils';
import { getId as getContractId } from '../../contract/model/interface';
import { ZERO_ADDRESS } from '../../utils';
import { ModelWithId } from '../../types/model';

/** @internal */
export interface EthCallId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** `to` field of call */
    readonly to: string;
    /** `data` field for call */
    readonly data: string;
    /** Historical block height to execute call. Defaults to `latest` */
    readonly defaultBlock?: number | 'latest';
    /** `from` field of call. Some providers may default this to `null` or `ZERO_ADDRESS`. */
    readonly from?: string;
    /** Maximum `gas` field for call. */
    readonly gas?: number;
}
export interface EthCall extends EthCallId {
    /** redux-orm id of call `${networkId}-{address}(data)-{options}` */
    readonly id?: string;
    /** Return value of call. Can be raw bytes or decoded with a contract ABI. */
    readonly returnValue?: any;
}

/** @internal */
export function getOptionsId(from: EthCallId['from'], block: EthCallId['defaultBlock'], gas: EthCallId['gas']) {
    if ((!from || from == ZERO_ADDRESS) && (block == undefined || block == 'latest') && gas == undefined)
        return undefined;

    const options: any = {};
    if (from) options.from = toChecksumAddress(from);
    if (block) options.block = block;
    if (gas) options.gas = gas;

    return JSON.stringify(block);
}

/** @internal */
export function getIdArgs(id: EthCallId): EthCallId {
    const { networkId, to, data, defaultBlock, from, gas } = id;
    const val: any = {
        networkId,
        to,
        data,
    };
    if (defaultBlock) val.defaultBlock = defaultBlock;
    if (from) val.from = from;
    if (gas) val.gas = gas;

    return val;
}

const SEPARATOR = '-';
/** @internal */
export function getId(id: EthCallId): string {
    if (typeof id === 'string') return id;

    const contractId = getContractId({ networkId: id.networkId, address: id.to });
    const optionsId = getOptionsId(id.from, id.defaultBlock, id.gas);

    let idStr = `${contractId}(${id.data})`;
    if (optionsId) idStr = [idStr, optionsId].join(SEPARATOR);

    return idStr;
}

/** @internal */
export function validate(item: EthCall): ModelWithId<EthCall> {
    const id = getId(item);
    const toChecksum = toChecksumAddress(item.to);
    const fromCheckSum = item.from ? toChecksumAddress(item.from) : undefined;

    return {
        ...item,
        id,
        to: toChecksum,
        from: fromCheckSum,
    };
}

export default EthCall;
