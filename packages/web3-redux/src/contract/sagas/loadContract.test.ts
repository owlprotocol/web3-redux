import { testSaga } from 'redux-saga-test-plan';
import loadContract from './loadContract.js';

import { name } from '../common.js';
import { network1336 } from '../../network/data.js';
import loadNetwork from '../../network/sagas/loadNetwork.js';
import { ADDRESS_0 } from '../../data.js';
import ContractCRUD from '../crud.js';
import { BlockNumberArtifact } from '../../abis/index.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;
const web3Sender = web3;
const address = ADDRESS_0;
const abi = BlockNumberArtifact.abi;
const web3Contract = new web3.eth.Contract(abi, address);
const web3SenderContract = new web3Sender.eth.Contract(abi, address);

describe(`${name}/sagas/loadContract.test.ts`, () => {
    describe('unit', () => {
        it('loadContract - existing', async () => {
            testSaga(loadContract, { networkId, address }, '')
                .next()
                .call(loadNetwork, networkId, '')
                .next({ networkId, web3 })
                .select(ContractCRUD.selectors.selectByIdSingle, { networkId, address })
                .next({ networkId, address, web3Contract, web3SenderContract })
                .call(ContractCRUD.db.get, { networkId, address })
                .next({ networkId, address, abi })
                .returns({ networkId, address, web3Contract, web3SenderContract })
                .next()
                .isDone();
        });
        it('loadContract - hydrate web3Contract', async () => {
            testSaga(loadContract, { networkId, address }, '')
                .next()
                .call(loadNetwork, networkId, '')
                .next({ networkId, web3, web3Sender })
                .select(ContractCRUD.selectors.selectByIdSingle, { networkId, address })
                .next({ networkId, address, web3SenderContract })
                .call(ContractCRUD.db.get, { networkId, address })
                .next({ networkId, address, abi })
                .put(ContractCRUD.actions.update({ networkId, address, abi }, ''))
                .next()
                .select(ContractCRUD.selectors.selectByIdSingle, { networkId, address })
                .next({ networkId, address, web3Contract, web3SenderContract })
                .returns({ networkId, address, web3Contract, web3SenderContract })
                .next()
                .isDone();
        });
        it('loadContract - hydrate web3SenderContract', async () => {
            testSaga(loadContract, { networkId, address }, '')
                .next()
                .call(loadNetwork, networkId, '')
                .next({ networkId, web3, web3Sender })
                .select(ContractCRUD.selectors.selectByIdSingle, { networkId, address })
                .next({ networkId, address, web3Contract })
                .call(ContractCRUD.db.get, { networkId, address })
                .next({ networkId, address, abi })
                .put(ContractCRUD.actions.update({ networkId, address, abi }, ''))
                .next()
                .select(ContractCRUD.selectors.selectByIdSingle, { networkId, address })
                .next({ networkId, address, web3Contract, web3SenderContract })
                .returns({ networkId, address, web3Contract, web3SenderContract })
                .next()
                .isDone();
        });
    });
});
