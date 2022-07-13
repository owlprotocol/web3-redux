import { put, call, select } from 'typed-redux-saga';
import type { ContractSendMethod } from 'web3-eth-contract';
import { create as createError } from '../../error/actions/index.js';

import { DeployAction, DEPLOY } from '../actions/index.js';
import NetworkCRUD from '../../network/crud.js';
import ContractCRUD from '../crud.js';

const DEPLOY_ERROR = `${DEPLOY}/ERROR`;

export function* deploySaga(action: DeployAction) {
    try {
        const { payload } = action;
        const { networkId, abi, bytecode, args, from, label, tags } = payload;
        //Make sure required parameters defined
        if (!networkId) throw new Error('networkId undefined');

        const network = yield* select(NetworkCRUD.selectors.selectByIdSingle, networkId);
        if (!network) throw new Error(`Network ${networkId} undefined`);

        const web3 = network.web3Sender ?? network.web3;
        if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

        const web3Contract = new web3.eth.Contract(abi);

        let tx: ContractSendMethod;
        if (!args || args.length == 0) tx = web3Contract.deploy({ data: bytecode, arguments: args });
        else tx = web3Contract.deploy({ data: bytecode });

        //Gas undefined or 0
        //@ts-expect-error
        const gas = yield* call(tx.estimateGas, { from }); //default gas
        const contract = yield* call(tx.send, { from, gas });
        yield* put(
            ContractCRUD.actions.create(
                { networkId, address: contract.options.address, abi, label, tags },
                action.meta.uuid,
            ),
        );
    } catch (error) {
        //Errors thrown at tx encoding, most likely invalid ABI (function name, paremeters...)
        const err = error as Error;
        yield* put(
            createError(
                {
                    id: action.meta.uuid,
                    errorMessage: err.message,
                    stack: err.stack,
                    type: DEPLOY_ERROR,
                },
                action.meta.uuid,
            ),
        );
    }
}

export default deploySaga;
