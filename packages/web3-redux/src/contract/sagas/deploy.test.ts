import { assert } from 'chai';
import { testSaga } from 'redux-saga-test-plan';
import deploySaga from './deploy.js';
import { AbiItem } from '../../utils/web3-utils/index.js';
import { sleep } from '../../utils/index.js';

import { name } from '../common.js';

import { BlockNumberArtifact } from '../../abis/index.js';

import { createStore, StoreType } from '../../store.js';
import { deployAction } from '../actions/index.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';
import { network1336 } from '../../network/data.js';

const networkId = network1336.networkId;
const web3 = network1336.web3!;
const abi = BlockNumberArtifact.abi as AbiItem[];
const bytecode = BlockNumberArtifact.bytecode;
const label = 'BlockNumber';

describe(`${name}/sagas/deploy.ts`, () => {
    let accounts: string[];
    let store: StoreType;

    before(async () => {
        accounts = await web3.eth.getAccounts();
    });

    describe('unit', () => {
        it('deploy', async () => {
            const from = accounts[0];
            /*
            const tx = new web3.eth.Contract(abi).deploy({
                data: bytecode,
            });
            const contract = await tx.send({ from, gas: 1000000 });
            */

            const action = deployAction({
                networkId,
                abi,
                bytecode,
                label,
                from,
            });
            testSaga(deploySaga, action)
                .next()
                .select(NetworkCRUD.selectors.selectByIdSingle, networkId)
                .next(network1336);
            /*
                .call(tx.estimateGas, { from })
                .next(1000000)
                .call(tx.send, { from, gas: 1000000 });
                .next(contract)
                .put(
                    ContractCRUD.actions.update(
                        {
                            networkId,
                            address: contract.options.address,
                            abi,
                            label,
                        },
                        action.meta.uuid,
                    ),
                )
                .next()
                .isDone();
                */
        });
    });

    describe('store', () => {
        beforeEach(async () => {
            store = createStore();
            store.dispatch(NetworkCRUD.actions.create(network1336));
        });

        it('deploy', async () => {
            const from = accounts[0];
            store.dispatch(
                deployAction({
                    networkId,
                    abi,
                    bytecode,
                    from,
                    label,
                }),
            );

            await sleep(300);

            const contracts = await ContractCRUD.db.where({ label });
            const contract = contracts.length > 0 ? contracts[0] : undefined;
            assert.isDefined(contract, 'contract');
        });
    });
});
