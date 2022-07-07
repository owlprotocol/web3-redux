import { put, call, select } from 'typed-redux-saga';
import getDB from '../../db.js';
import NetworkCRUD from '../../network/crud.js';
import { FetchAction } from '../actions/index.js';
import TransactionCRUD from '../crud.js';
import Transaction from '../model/interface.js';

function* fetch(action: FetchAction) {
    const { payload } = action;
    const { networkId, hash } = payload;

    const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, { networkId });
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const web3 = network.web3 ?? network.web3Sender;
    if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

    const db = getDB();
    const tx = (yield* call([db.Transaction, db.Transaction.get], TransactionCRUD.validateId({ networkId, hash }))) as
        | Transaction
        | undefined;
    if (!tx) yield* put(TransactionCRUD.actions.create({ networkId, hash }));

    const transaction = yield* call(web3.eth.getTransaction, hash);
    const newTransaction = { ...transaction, networkId };
    yield* put(TransactionCRUD.actions.update(newTransaction));
}

export default fetch;
