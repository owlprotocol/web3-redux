import { attr, fk, Model as ORMModel } from 'redux-orm';
import Web3 from 'web3';
import { EventData } from 'web3-eth-contract';
import { contractId } from '../contract/model';

export interface ReturnValues {
    returnValues: any;
}
export interface PartialContractEvent<T extends ReturnValues = ReturnValues> extends EventData {
    networkId: string;
    address: string;
    name: string;
    returnValues: T['returnValues'];
}

/**
 * ContractEvent object. Used to index web3.eth.Contract.events.
 *
 * @param id - Call id. Computed as `${networkId}-${blockHash}-${logIndex}`.
 */
export interface ContractEvent<T extends ReturnValues = ReturnValues> extends PartialContractEvent<T> {
    //Computed
    id: string;
    contractId: string;
}

class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = 'ContractEvent';

    static fields = {
        id: attr(),
        contractId: fk({ to: 'Contract', as: 'contract', relatedName: 'events' }),
        networkId: fk({ to: 'Network', as: 'network', relatedName: 'events' }),
        address: attr(),
        name: attr(),
    };
}

export function contractEventId(event: PartialContractEvent) {
    return `${event.networkId}-${event.blockHash}-${event.logIndex}`;
}

export function validatedContractEvent<T extends ReturnValues = ReturnValues>(
    event: PartialContractEvent<T>,
): ContractEvent<T> {
    const addressChecksum = Web3.utils.isAddress(event.address)
        ? Web3.utils.toChecksumAddress(event.address)
        : event.address;
    return {
        ...event,
        address: addressChecksum,
        id: contractEventId(event),
        contractId: contractId({ networkId: event.networkId, address: event.address }),
    };
}

export { Model };
