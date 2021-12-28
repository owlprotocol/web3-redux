import { toChecksumAddress } from 'web3-utils';
import { getId as getContractId } from '../../contract/model/interface';
import { ZERO_ADDRESS } from '../../utils';

/** @internal */
export interface IdDeconstructed {
    readonly networkId: string;
    readonly to: string;
    readonly data: string;
    //Optional id args
    readonly defaultBlock?: number | 'latest';
    readonly from?: string;
    readonly gas?: number;
}
/** @internal */
export type Id = string;

export interface Interface extends IdDeconstructed {
    readonly id?: Id;
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
export function validate(item: Interface): Interface {
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

export default Interface;
