import { put, select, take, all } from 'redux-saga/effects';
import { Contract, isContractCallTransactionSync } from '../../contract/model';
import { call as contractCallAction } from '../../contract/actions';
import { selectByIdMany as selectContractByIdMany } from '../../contract/selector';
import { Transaction, transactionId } from '../model';
import { CREATE, CreateAction } from '../actions';

function* contractCallTransactionSync(transaction: Transaction) {
    const selectResult: ReturnType<typeof selectContractByIdMany> = yield select(selectContractByIdMany);
    const contracts: Contract[] = selectResult.filter(
        (c) => !!c && c.networkId === transaction.networkId,
    ) as Contract[];
    const putContractCall: any[] = [];
    contracts.forEach((contract) => {
        Object.entries(contract.methods ?? {}).map(([methodName, method]) => {
            Object.values(method).map((contractCall) => {
                if (
                    !!contractCall.sync &&
                    isContractCallTransactionSync(contractCall.sync) &&
                    contractCall.sync.filter(transaction)
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

/** Yields for each transaction on creation and blockNumber update */
function* onCreateLoop() {
    const cache: { [key: string]: number } = {};
    while (true) {
        const action: CreateAction = yield take(CREATE);
        const transaction = action.payload;
        const id = transactionId(transaction);
        if (transaction.blockNumber && cache[id] != transaction.blockNumber) {
            //Call transaction sync on first confirmed create or block update
            cache[id] = transaction.blockNumber;
            yield contractCallTransactionSync(transaction);
        }
    }
}

export default onCreateLoop;
