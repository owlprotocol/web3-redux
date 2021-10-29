import { put, call } from 'typed-redux-saga/macro';
import { validatedEthCall } from '../../ethcall/model';
import { create as createEthCall, update as updateEthCall } from '../../ethcall/actions';
import { create, CallAction, CALL } from '../actions';
import contractExists from './contractExists';
import networkExists from '../../network/sagas/networkExists';

const CALL_ERROR = `${CALL}/ERROR`;

function* contractCall(action: CallAction) {
    try {
        const { payload } = action;
        const { networkId, address, from, defaultBlock, argsHash } = payload;

        //@ts-ignore
        yield* call(networkExists, networkId);
        //@ts-ignore
        const contract: Contract = yield* call(contractExists, networkId, address);

        const web3Contract = contract.web3Contract!;
        let tx: any;
        if (!payload.args || payload.args.length == 0) {
            tx = web3Contract.methods[payload.method]();
        } else {
            tx = web3Contract.methods[payload.method](...payload.args);
        }
        const data = tx.encodeABI();

        const ethCall = validatedEthCall({
            networkId,
            from,
            to: contract.address,
            defaultBlock,
            data,
            gas: payload.gas,
        });

        //Create base call
        yield* put(createEthCall(ethCall));

        const contractCallSync = contract.methods[payload.method][argsHash];
        if (!contractCallSync) {
            contract.methods[payload.method][argsHash] = { ethCallId: ethCall.id };
            yield* put(create(contract));
        } else if (contractCallSync.ethCallId != ethCall.id) {
            contract.methods[payload.method][argsHash].ethCallId = ethCall.id;
            yield* put(create(contract));
        }

        const gas = ethCall.gas ?? (yield* call(tx.estimateGas, { ...ethCall })); //default gas
        //@ts-ignore
        const returnValue = yield* call(tx.call, { ...ethCall, gas }, ethCall.defaultBlock);
        yield* put(updateEthCall({ ...ethCall, returnValue }));
    } catch (error) {
        console.error(error);
        yield* put({
            type: CALL_ERROR,
            error,
            action,
        });
    }
}

export default contractCall;
