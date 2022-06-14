import type { Contract as Web3Contract } from 'web3-eth-contract';
import { coder } from '../../utils/web3-eth-abi/index.js';
import { filter, keyBy } from '../../utils/lodash/index.js';
import { AbiItem, toChecksumAddress, isAddress } from '../../utils/web3-utils/index.js';
import { ModelWithId } from '../../types/model.js';
import { Transaction } from '../../transaction/model/interface.js';

/**
 * Contract Id object.
 *
 */
export interface ContractId {
    /** Blockchain network id.
     * See [chainlist](https://chainlist.org/) for a list of networks. */
    readonly networkId: string;
    /** Contract ethereum address */
    readonly address: string;
}

/** @internal */
export type BaseWeb3Contract = Omit<Web3Contract, 'once' | 'clone' | '_address' | '_jsonInterface'>;

/**
 * Contract object.
 * @typeParam T
 * [TypeChain](https://github.com/dethcrypto/TypeChain) web3.js contract. Enables getting type inference for calls and events. Defaults to standard Web3.js contract interface.
 */
export interface Contract<T extends BaseWeb3Contract = BaseWeb3Contract> extends ContractId {
    /** Used to index contracts in redux-orm. Computed as `${networkId}-${address}` */
    readonly id?: string;
    /** Contract ABI */
    readonly abi?: AbiItem[];
    /** [web3.eth.Contract](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html) instance */
    readonly web3Contract?: T;
    /** [web3.eth.Contract](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html) instance used for send transactions */
    readonly web3SenderContract?: T;
    /** Account balance in wei */
    readonly balance?: string;
    /** Account nonce aka number of transactions sent. */
    readonly nonce?: number;
    /** Code stored at address */
    readonly code?: string;
    /** Ens domain associated with address */
    readonly ens?: string;
    /** Custom label set by user for address */
    readonly label?: string;
    /** Event abis indexed by signature */
    readonly eventAbiBySignature?: { [k: string]: AbiItem };

    /** ORM Relational */
    readonly fromTransactions?: Transaction[];
    readonly toTransactions?: Transaction[];
    /** ContractIndex redux-orm ids. Used for efficient filtering. */
    readonly indexIds?: string[];
}

const SEPARATOR = '-';
/** @internal */
export function getId(id: Partial<ContractId>): string {
    const { networkId, address } = id;
    if (address && isAddress(address)) return [networkId, toChecksumAddress(address.slice())].join(SEPARATOR);
    return [networkId, address].join(SEPARATOR);
}
/** @internal */
export function getIdDeconstructed(id: string): ContractId {
    const [networkId, address] = id.split(SEPARATOR); //Assumes separator not messed up
    return { networkId, address: toChecksumAddress(address.slice()) };
}

/** @internal */
export function validate(contract: Contract): ModelWithId<Contract> {
    const { networkId, address, abi } = contract;
    const id = getId({ networkId, address });
    const eventAbis = filter(abi, (x) => x.type === 'event');
    const eventAbiBySignature = keyBy(eventAbis, (x) => coder.encodeEventSignature(x));

    const result = {
        ...contract,
        id,
        address: toChecksumAddress(address.slice()),
    };
    if (Object.keys(eventAbiBySignature).length > 0) result.eventAbiBySignature = eventAbiBySignature;

    return result;
}

export default Contract;
