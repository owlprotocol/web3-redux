import { toChecksumAddress } from 'web3-utils';
import { getId as getContractId } from '../../contract/model/interface';
import { ZERO_ADDRESS } from '../../utils';
import { ModelWithId } from '../../types/model';

/** @internal */
export interface IdDeconstructed {
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
/** @internal */
export type Id = string;

export interface EthCall extends IdDeconstructed {
    /** redux-orm id of call `${networkId}-{address}(data)-{options}` */
    readonly id?: Id;
    /** Return value of call. Can be raw bytes or decoded with a contract ABI. */
    readonly returnValue?: any;
}

/** @internal */
export function getOptionsId(
    from: IdDeconstructed['from'],
    block: IdDeconstructed['defaultBlock'],
    gas: IdDeconstructed['gas'],
) {
    if ((!from || from == ZERO_ADDRESS) && (block == undefined || block == 'latest') && gas == undefined)
        return undefined;

    const options: any = {};
    if (from) options.from = toChecksumAddress(from);
    if (block) options.block = block;
    if (gas) options.gas = gas;

    return JSON.stringify(block);
}

/** @internal */
export type IdArgs = IdDeconstructed | Id;
const SEPARATOR = '-';
/** @internal */
export function getId(id: IdArgs): Id {
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
