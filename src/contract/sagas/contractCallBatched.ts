import { put, all, select, call } from 'typed-redux-saga/macro';
import { validate as validatedEthCall } from '../../ethcall/model';
import { create as createEthCall } from '../../ethcall/actions';
import { Contract, callArgsHash, getId } from '../model';
import { create, CallBatchedAction, CALL_BATCHED } from '../actions';
import selectByIdMany from '../selectors/selectByIdMany';
import networkExists from '../../network/sagas/exists';
import { Network } from '../../network/model';
import { ZERO_ADDRESS } from '../../utils';

const CALL_BATCHED_ERROR = `${CALL_BATCHED}/ERROR`;

function* contractCallBatched(action: CallBatchedAction) {
    try {
        const { payload } = action;
        const { requests, networkId } = payload;
        const network: Network = yield* call(networkExists, networkId);
        if (!network.web3) throw new Error(`Network ${networkId} missing web3`);

        const web3 = network.web3;
        const multicallContract = network.multicallContract;

        const contractIds = Array.from(new Set(requests.map((f) => getId({ address: f.address, networkId }))));
        const selectResult: ReturnType<typeof selectByIdMany> = yield* select(selectByIdMany, contractIds);
        const contracts = selectResult.filter((c) => !!c) as Contract[];
        const contractsByAddress: { [key: string]: Contract } = {};
        contracts.filter((c) => c != null).forEach((c) => (contractsByAddress[c.address] = c));

        const batch = new web3.eth.BatchRequest();

        //TODO: Investigate potential issue batch gas expense too large
        //TODO: Investigate potential issue batch data size too large
        const preCallTasks = requests.map((f) => {
            const contract = contractsByAddress[f.address];
            const web3Contract = contract.web3Contract!;

            let tx: any;
            if (!f.args || f.args.length == 0) {
                tx = web3Contract.methods[f.method]();
            } else {
                tx = web3Contract.methods[f.method](...f.args);
            }

            const data = tx.encodeABI();
            const ethCall = validatedEthCall({
                networkId: network.networkId,
                to: f.address,
                data,
                gas: f.gas,
            });

            //Create base call
            const putEthCallTask = put(createEthCall(ethCall));

            //Update contract call key if not stored
            const key = callArgsHash({ from: ethCall.from, defaultBlock: ethCall.defaultBlock, args: f.args });
            const contractCallSync = contract.methods![f.method][key];
            if (!contractCallSync) {
                contract.methods![f.method][key] = { ethCallId: ethCall.id };
            } else if (contractCallSync.ethCallId != ethCall.id) {
                contract.methods![f.method][key].ethCallId = ethCall.id;
            }

            //Output decoder for multicall
            const methodAbi = contract.abi!.find((m) => m.name === f.method)!;
            const methodAbiOutput = methodAbi.outputs;

            return { tx, ethCall, putEthCallTask, methodAbiOutput };
        });

        //All update eth call
        yield* all(preCallTasks.map((x) => x.putEthCallTask));
        //All update contract
        yield* all(contracts.map((c) => put(create(c))));

        //If not Multicall, or from/defaultBlock specified
        const regularCallTasks = preCallTasks.filter((t) => {
            return !(
                multicallContract &&
                (!t.ethCall.from || t.ethCall.from == ZERO_ADDRESS) &&
                (!t.ethCall.defaultBlock || t.ethCall.defaultBlock === 'latest')
            );
        });
        //Batch at smart-contract level with Multicall
        const multiCallTasks = preCallTasks.filter((t) => {
            return (
                multicallContract &&
                (!t.ethCall.from || t.ethCall.from == ZERO_ADDRESS) &&
                (!t.ethCall.defaultBlock || t.ethCall.defaultBlock === 'latest')
            );
        });

        const regularCalls = regularCallTasks.map((t) => {
            //@ts-ignore
            const batchFetchTask = new Promise((resolve, reject) => {
                batch.add(
                    t.tx.call.request({ from: t.ethCall.from }, (error: any, result: any) => {
                        if (error) reject(error);
                        resolve(result);
                    }),
                );
            });

            return batchFetchTask;
        });

        //See https://github.com/makerdao/multicall/blob/master/src/Multicall.sol
        const multicallCallsInput = multiCallTasks.map((t) => {
            return { target: t.ethCall.to, callData: t.ethCall.data };
        });
        if (!!multicallContract && multicallCallsInput.length > 0) {
            const tx = multicallContract.methods.aggregate(multicallCallsInput);
            const batchFetchTask = new Promise((resolve, reject) => {
                batch.add(
                    tx.call.request({ from: ZERO_ADDRESS }, (error: any, result: any) => {
                        if (error) reject(error);
                        resolve(result);
                    }),
                );
            });
            regularCalls.push(batchFetchTask);
        }

        //All return call result
        const batchCallTasks = all(regularCalls);
        batch.execute();

        const batchResults: any[] = yield batchCallTasks;
        //Track call task
        let callTaskIdx = 0;
        const updateEthCallTasks = all(
            batchResults.map((returnValue) => {
                if (callTaskIdx < regularCallTasks.length) {
                    const ethCall = preCallTasks[callTaskIdx].ethCall;
                    callTaskIdx += 1;
                    return put(createEthCall({ ...ethCall, returnValue }));
                } else {
                    const [, returnData]: [any, string[]] = returnValue;
                    const putActions = returnData.map((data) => {
                        const task = preCallTasks[callTaskIdx];
                        const ethCall = task.ethCall;
                        //TODO: Format based on __length__
                        const multicallReturnValue = task.methodAbiOutput
                            ? web3.eth.abi.decodeParameters(task.methodAbiOutput, data)
                            : undefined;
                        if (!multicallReturnValue || multicallReturnValue.__length__ == 0) return Promise.resolve(); //No value

                        let formatedValue: any;
                        if (multicallReturnValue.__length__ == 1) {
                            formatedValue = multicallReturnValue['0'];
                        } else if (multicallReturnValue.__length__ > 1) {
                            formatedValue = [];
                            for (let i = 0; i < multicallReturnValue.__length__; i++) {
                                formatedValue.push(multicallReturnValue[i]);
                            }
                        }
                        callTaskIdx += 1;
                        return put(createEthCall({ ...ethCall, returnValue: formatedValue }));
                    });

                    return all(putActions);
                }
            }),
        );

        yield updateEthCallTasks;
    } catch (error) {
        console.error(error);
        yield* put({
            type: CALL_BATCHED_ERROR,
            error,
            action,
        });
    }
}

export default contractCallBatched;
