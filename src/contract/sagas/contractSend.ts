import { END, eventChannel, EventChannel, TakeableChannel } from 'redux-saga';
import { put, call, take } from 'typed-redux-saga/macro';
import { PromiEvent, TransactionReceipt } from 'web3-core';
import { ContractSendStatus } from '../../contractsend/model';
import { create as createContractSend, update as updateContractSend } from '../../contractsend/actions';
import { create as createTransaction } from '../../transaction/actions';
import { SEND, SendAction } from '../actions';
import exists from './exists';
import networkExists from '../../network/sagas/exists';
import { Contract, getId } from '../model';

const CONTRACT_SEND_HASH = `${SEND}/HASH`;
const CONTRACT_SEND_RECEIPT = `${SEND}/RECEIPT`;
const CONTRACT_SEND_CONFIRMATION = `${SEND}/CONFIRMATION`;
const CONTRACT_SEND_ERROR = `${SEND}/ERROR`;
const CONTRACT_SEND_DONE = `${SEND}/DONE`;
interface ContractSendChannelMessage {
    type:
        | typeof CONTRACT_SEND_HASH
        | typeof CONTRACT_SEND_RECEIPT
        | typeof CONTRACT_SEND_CONFIRMATION
        | typeof CONTRACT_SEND_ERROR;
    error?: any;
    hash?: string;
    receipt?: TransactionReceipt;
    confirmations?: number;
}

function contractSendChannel(tx: PromiEvent<TransactionReceipt>): EventChannel<ContractSendChannelMessage> {
    return eventChannel((emitter) => {
        tx.on('transactionHash', (hash: string) => {
            emitter({ type: CONTRACT_SEND_HASH, hash });
        })
            .on('receipt', (receipt: TransactionReceipt) => {
                emitter({ type: CONTRACT_SEND_RECEIPT, receipt });
            })
            .on('confirmation', (confirmations: number) => {
                emitter({ type: CONTRACT_SEND_CONFIRMATION, confirmations });
                if (confirmations == 24) emitter(END);
            })
            .on('error', (error: any) => {
                emitter({
                    type: CONTRACT_SEND_ERROR,
                    error,
                });
                emitter(END);
            });
        // The subscriber must return an unsubscribe function
        return () => {}; //eslint-disable-line @typescript-eslint/no-empty-function
    });
}

function* contractSend(action: SendAction) {
    try {
        const { payload } = action;
        const { networkId, address, method, args, from } = payload;
        const id = getId({ networkId, address });

        //@ts-ignore
        yield* call(networkExists, networkId);
        const contract: Contract = yield* call(exists, id);

        const web3Contract = contract.web3SenderContract;
        if (!web3Contract) throw new Error(`${getId({ address, networkId })} has no web3SenderContract`);

        const gasPrice = payload.gasPrice ?? 0;
        const value = payload.value ?? 0;

        let tx: any;
        if (!args || args.length == 0) {
            tx = web3Contract.methods[method]();
        } else {
            tx = web3Contract.methods[method](...args);
        }

        //Before calling web3 estimateGas() and send(), first save the contractSend object to store any error messages
        const baseContractSend = {
            networkId,
            address,
            methodName: method,
            args,
            from,
            value,
        };

        yield* put(
            createContractSend({
                ...baseContractSend,
                status: ContractSendStatus.PENDING_SIGNATURE,
            }),
        );

        const gas = payload.gas ?? (yield* call(tx.estimateGas, { from, value }));
        const txPromiEvent: PromiEvent<TransactionReceipt> = tx.send({ from, gas, gasPrice, value });

        const channel: TakeableChannel<ContractSendChannelMessage> = yield* call(contractSendChannel, txPromiEvent);
        let initialConfirm = false;
        while (true) {
            const message: ContractSendChannelMessage = yield* take(channel);
            const { type, hash, receipt, confirmations } = message;
            if (type === CONTRACT_SEND_HASH) {
                yield* put(createTransaction({ networkId, hash: hash! }));
                yield* put(
                    updateContractSend({
                        ...baseContractSend,
                        transactionHash: hash!,
                        status: ContractSendStatus.PENDING_CONFIRMATION,
                    }),
                );
            } else if (type === CONTRACT_SEND_RECEIPT) {
                yield* put(
                    updateContractSend({
                        ...baseContractSend,
                        receipt: receipt,
                        blockNumber: receipt?.blockNumber,
                        blockHash: receipt?.blockHash,
                        status: ContractSendStatus.PENDING_CONFIRMATION,
                    }),
                );
            } else if (type === CONTRACT_SEND_CONFIRMATION) {
                if (!initialConfirm && confirmations && confirmations > 0) {
                    initialConfirm = true;
                    yield* put(
                        updateContractSend({
                            ...baseContractSend,
                            confirmations: confirmations,
                            status: ContractSendStatus.CONFIRMED,
                        }),
                    );
                }
            } else if (type === CONTRACT_SEND_ERROR) {
                const { error } = message;
                //handle metamask reject or other errors
                yield* put(
                    updateContractSend({
                        ...baseContractSend,
                        error,
                        status: ContractSendStatus.ERROR,
                    }),
                );

                console.error(error);
                yield* put({ type: CONTRACT_SEND_ERROR, error, action });
            }
        }
    } catch (error) {
        console.error(error);
        yield* put({ type: CONTRACT_SEND_ERROR, error, action });
    } finally {
        yield* put({ type: CONTRACT_SEND_DONE, action });
    }
}

export default contractSend;
