import { put, select, take, all } from 'redux-saga/effects';

import { Contract, isContractCallBlockSync } from '../../contract/model';
import { selectByIdMany as selectContractByIdMany } from '../../contract/selector';
import { call as contractCallAction } from '../../contract/actions';
import { transactionId } from '../../transaction/model';
import { create as createTransaction } from '../../transaction/actions';

import { Block, blockId, isBlockTransactionObject, isBlockTransactionString } from '../model';
import { CREATE, CreateAction } from '../actions';

function* createBlockTransactions(block: Block) {
    if (isBlockTransactionString(block)) {
        const transactions = block.transactions;
        const actions = transactions.map((hash: string) => {
            return put(
                createTransaction({
                    hash,
                    networkId: block.networkId,
                    blockNumber: block.number,
                    blockId: block.id!,
                    id: transactionId({ hash, networkId: block.networkId }),
                }),
            );
        });
        yield all(actions);
    } else if (isBlockTransactionObject(block)) {
        const transactions = block.transactions;
        const actions = transactions.map((tx) => {
            return put(
                createTransaction({
                    ...tx,
                    networkId: block.networkId,
                    blockId: block.id!,
                    id: transactionId({ hash: tx.hash, networkId: block.networkId }),
                }),
            );
        });
        yield all(actions);
    }
}

function* contractCallBlockSync(block: Block) {
    const selectResult: ReturnType<typeof selectContractByIdMany> = yield select(selectContractByIdMany);
    const contracts: Contract[] = selectResult.filter((c) => !!c && c.networkId === block.networkId) as Contract[];
    const putContractCall: any[] = [];
    contracts
        .filter((contract) => contract.networkId === block.networkId)
        .map((contract) => {
            Object.entries(contract.methods ?? {}).map(([methodName, method]) => {
                Object.values(method).map((contractCall) => {
                    if (
                        !!contractCall.sync &&
                        isContractCallBlockSync(contractCall.sync) &&
                        contractCall.sync.filter(block)
                    ) {
                        putContractCall.push(
                            put(
                                contractCallAction({
                                    address: contract.address,
                                    networkId: contract.networkId,
                                    method: methodName,
                                    ...contractCall,
                                }),
                            ),
                        );
                    }
                });
            });
        });

    yield all(putContractCall);
}

function* onCreateLoop() {
    const cache: { [key: string]: string | undefined } = {};
    while (true) {
        const action: CreateAction = yield take(CREATE);
        const block = action.payload;
        const id = blockId(block);
        if (cache[id] != block.hash) {
            //Call block sync on first create or block hash update (new block)
            cache[id] = block.hash;
            yield all([createBlockTransactions(block), contractCallBlockSync(block)]);
        } else {
            yield createBlockTransactions(block);
        }
    }
}

export default onCreateLoop;
