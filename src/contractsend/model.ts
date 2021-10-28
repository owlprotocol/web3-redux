import { attr, fk, Model as ORMModel } from 'redux-orm';
import { toChecksumAddress } from 'web3-utils';
import { getId } from '../contract';
import { transactionId } from '../transaction/model';
import { ZERO_ADDRESS } from '../utils';

export enum ContractSendStatus {
    PENDING_SIGNATURE = 'PENDING_SIGNATURE', //Pending wallet signature
    ERROR = 'ERROR',
    PENDING_CONFIRMATION = 'PENDING_CONFIRMATION', //Pending blockchain confirmation
    CONFIRMED = 'CONFIRMED',
}

/**
 * Contract send object. Stores a pending transaction awaiting confirmation.
 *
 * @param id - Used to index in redux-orm. Computed as `${networkId}-${address}-${methodName}(${args},${from},${value})`.
 * @param args - Function arguments.
 * @param from - Account to sign.
 * @param value - Send value.
 * @param transactionHash - Transaction hash once confirmed.
 * @param transactionId -Transaction id once confirmed.
 */
export interface ContractSend {
    id?: string;
    networkId: string;
    address: string;
    methodName: string;
    args?: any[];
    from: string;
    value?: any;
    transactionHash?: string;
    transactionId?: string;
    status: ContractSendStatus;
    error?: any;
    confirmations?: number;
    receipt?: any;
    blockNumber?: number;
    blockHash?: string;
}

class Model extends ORMModel {
    static options = {
        idAttribute: 'id',
    };

    static modelName = 'ContractSend';

    static fields = {
        id: attr(),
        address: attr(),
        methodName: attr(),
        args: attr(),
        from: attr(),
        value: attr(),
        transactionHash: attr(),
        transactionId: fk({ to: 'Transaction', as: 'transaction' }),
        status: attr(),
        error: attr(),
    };
}

export function contractSendId({
    networkId,
    address,
    methodName,
    args,
    from,
    value,
}: {
    networkId: string;
    address: string;
    methodName: string;
    args?: any[];
    from: string;
    value?: any;
}) {
    const fromCheckSum = toChecksumAddress(from);
    const cId = getId({ networkId, address });

    let argsId: string;
    if (!args || args.length === 0) argsId = '()';
    else argsId = `(${args.join(',')})`;

    const options: any = {};
    if (fromCheckSum && fromCheckSum != ZERO_ADDRESS) options.from = fromCheckSum;
    if (value) options.value = value;
    const optionsId = JSON.stringify(options);

    let id = `${cId}-${methodName}(${argsId})`;
    if (optionsId != '{}') id = `${id}-${optionsId}`;

    return id;
}

export function validatedContractSend(contractSend: ContractSend): ContractSend {
    const { networkId, from, transactionHash } = contractSend;
    const fromCheckSum = toChecksumAddress(from);
    const id = contractSendId({ ...contractSend, from: fromCheckSum });
    const contractSendTransactionId = transactionHash ? transactionId({ networkId, hash: transactionHash }) : undefined;

    return {
        ...contractSend,
        id,
        transactionId: contractSendTransactionId,
    };
}

export { Model };
