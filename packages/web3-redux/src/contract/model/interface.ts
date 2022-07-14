import type { Contract as Web3Contract } from 'web3-eth-contract';
import { coder } from '../../utils/web3-eth-abi/index.js';
import { filter, keyBy, omit } from '../../utils/lodash/index.js';
import { AbiItem } from '../../utils/web3-utils/index.js';
import { NetworkWithObjects } from '../../network/model/interface.js';
import toReduxOrmId from '../../utils/toReduxORMId.js';

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
export interface Contract extends ContractId {
    /** Contract ABI */
    readonly abi?: AbiItem[];
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
    /** Custom tags set to index address */
    readonly tags?: string[];
    /** Event abis indexed by signature */
    readonly eventAbiBySignature?: { [k: string]: AbiItem };
}

export interface ContractWithObjects<T extends BaseWeb3Contract = BaseWeb3Contract> extends Contract {
    /** [web3.eth.Contract](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html) instance */
    readonly web3Contract?: T;
    /** [web3.eth.Contract](https://web3js.readthedocs.io/en/v1.5.2/web3-eth-contract.html) instance used for send transactions */
    readonly web3SenderContract?: T;
}

export type ContractIndexInput = ContractId | { networkId: string } | { label: string };
export const ContractIndex = '[networkId+address], networkId, label, *tags';

/** @internal */
export function validateId(item: Partial<ContractId>) {
    //if (!item.networkId) throw new Error('networkId undefined');
    //if (!item.address) throw new Error('address undefined');

    return [item.networkId, item.address?.toLowerCase()] as [string, string];
}

/** @internal */
export function validate(contract: Contract): Contract {
    const { networkId, address, abi } = contract;
    const eventAbis = filter(abi, (x) => x.type === 'event');
    const eventAbiBySignature = keyBy(eventAbis, (x) => coder.encodeEventSignature(x));

    const result = {
        ...contract,
        address: address.toLowerCase(),
        id: toReduxOrmId(validateId({ networkId, address })),
    };
    if (Object.keys(eventAbiBySignature).length > 0) result.eventAbiBySignature = eventAbiBySignature;

    return result;
}

/**
 * Hydrate contract with objects.
 * @param contract
 */
export function hydrate(contract: Contract, sess: any): ContractWithObjects {
    const { networkId, abi, address } = contract;
    const contractORM: ContractWithObjects | undefined = sess.Contract.withId(
        toReduxOrmId(validateId({ networkId, address })),
    );

    const network: NetworkWithObjects | undefined = sess.Network.withId(networkId);
    const { web3, web3Sender } = network ?? {};

    let web3Contract: BaseWeb3Contract | undefined;
    if (contractORM?.web3Contract && abi === contractORM.abi) {
        //Existing web3 contract
        web3Contract = contractORM.web3Contract;
    } else if (abi && web3) {
        //New web3 contract
        web3Contract = new web3.eth.Contract(abi, address);
    }

    let web3SenderContract: BaseWeb3Contract | undefined;
    if (contractORM?.web3SenderContract && abi === contractORM.abi) {
        //Existing web3 contract
        web3SenderContract = contractORM.web3SenderContract;
    } else if (abi && web3Sender) {
        //New web3 contract
        web3SenderContract = new web3Sender.eth.Contract(abi, address);
    }

    return {
        ...contract,
        web3Contract,
        web3SenderContract,
    };
}

/**
 * Encode contract
 * @param contract
 */
export function encode(contract: ContractWithObjects): Contract {
    return omit(contract, ['web3Contract', 'web3SenderContract']);
}

export default Contract;
