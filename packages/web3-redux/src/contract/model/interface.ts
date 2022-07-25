import type { Contract as Web3Contract } from 'web3-eth-contract';
import { coder } from '../../utils/web3-eth-abi/index.js';
import { filter, isUndefined, keyBy, omit, omitBy } from '../../utils/lodash/index.js';
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
    /** contract instance that is connected to GSN */
    readonly web3GSNSenderContract?: T;
}

export type ContractIndexInput = ContractId | { networkId: string } | { label: string };
export const ContractIndex = '[networkId+address], networkId, label, *tags';

/** @internal */
export function validateId({ networkId, address }: ContractId): ContractId {
    return {
        networkId,
        address: address.toLowerCase(),
    };
}

export function toPrimaryKey({ networkId, address }: ContractId): [string, string] {
    return [networkId, address.toLowerCase()];
}

/** @internal */
export function validate(contract: Contract): Contract {
    const { abi } = contract;
    const { networkId, address } = validateId(contract);
    const eventAbis = filter(abi, (x) => x.type === 'event');
    const eventAbiBySignature = keyBy(eventAbis, (x) => coder.encodeEventSignature(x));

    return omitBy(
        {
            ...contract,
            address,
            id: toReduxOrmId(toPrimaryKey({ networkId, address })),
            eventAbiBySignature,
        },
        isUndefined,
    ) as unknown as Contract;
}

/**
 * Hydrate contract with objects.
 * @param contract
 */
export function hydrate(contract: Contract, sess: any): ContractWithObjects {
    const { abi } = contract;
    const { networkId, address } = validateId(contract);

    const contractORM: ContractWithObjects | undefined = sess.Contract.withId(
        toReduxOrmId(toPrimaryKey({ networkId, address })),
    );

    const network: NetworkWithObjects | undefined = sess.Network.withId(networkId);
    const { web3, web3Sender, web3WithGSN } = network ?? {};

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

    let web3GSNSenderContract: BaseWeb3Contract | undefined;
    if (network?.relayHub && network.forwarder) {
        if (contractORM?.web3GSNSenderContract && abi === contractORM.abi) {
            //Existing web3 contract
            web3GSNSenderContract = contractORM.web3GSNSenderContract;
        } else if (abi && web3WithGSN) {
            //New web3 contract
            web3GSNSenderContract = new web3WithGSN.eth.Contract(abi, address);
        }
    }

    return omitBy(
        {
            ...contract,
            web3Contract,
            web3SenderContract,
            web3GSNSenderContract,
        },
        isUndefined,
    ) as unknown as ContractWithObjects;
}

/**
 * Encode contract
 * @param contract
 */
export function encode(contract: ContractWithObjects): Contract {
    return omit(contract, ['web3Contract', 'web3SenderContract', 'web3GSNSenderContract']);
}

export default Contract;
