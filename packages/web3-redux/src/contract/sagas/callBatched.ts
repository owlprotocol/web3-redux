import { put, select, all, call } from 'typed-redux-saga';
import { CallBatchedAction, CALL_BATCHED } from '../actions/index.js';
import EthCallCRUD from '../../ethcall/crud.js';
import ContractCRUD from '../crud.js';
import { compact, groupBy } from '../../utils/lodash/index.js';
import loadNetwork from '../../network/sagas/loadNetwork.js';

const ADDRESS_0 = '0x0000000000000000000000000000000000000000';
const CALL_BATCHED_ERROR = `${CALL_BATCHED}/ERROR`;

export function* callBatched(action: CallBatchedAction) {
    try {
        const { payload } = action;
        const { requests, networkId } = payload;

        if (!networkId) throw new Error('networkId undefined');

        const network = yield* call(loadNetwork, networkId);
        if (!network) throw new Error(`Network ${networkId} undefined`);

        const web3 = network.web3 ?? network.web3Sender;
        if (!web3) throw new Error(`Network ${networkId} missing web3 or web3Sender`);

        const contractIds = Array.from(new Set(requests.map((f) => f.address))).map((address) => {
            return { networkId, address };
        });
        const selectResult: ReturnType<typeof ContractCRUD.selectors.selectByIdMany> = yield* select(
            ContractCRUD.selectors.selectByIdMany,
            contractIds,
        );
        const contracts = compact(selectResult);
        const contractsByAddress = groupBy(contracts, 'address');
        const batch = new web3.eth.BatchRequest();

        //TODO: Investigate potential issue batch gas expense too large
        //TODO: Investigate potential issue batch data size too large
        const preCallTasks = compact(
            requests.map((f) => {
                const contracts = contractsByAddress[f.address];
                const contract = contracts.length > 0 ? contracts[0] : undefined;
                if (!contract) return undefined;
                const web3Contract = contract.web3Contract!;

                let tx: any;
                if (!f.args || f.args.length == 0) {
                    tx = web3Contract.methods[f.method]();
                } else {
                    tx = web3Contract.methods[f.method](...f.args);
                }

                const data = tx.encodeABI();
                const ethCall = EthCallCRUD.validate({
                    networkId: network.networkId,
                    to: f.address,
                    data,
                    gas: f.gas,
                });

                //Create base call
                const putEthCallTask = put(EthCallCRUD.actions.upsert(ethCall));
                //Output decoder for multicall
                const methodAbi = contract.abi!.find((m) => m.name === f.method)!;
                const methodAbiOutput = methodAbi.outputs;

                return { tx, ethCall, putEthCallTask, methodAbiOutput };
            }),
        );

        /**TODO: Fix here */
        //All update eth call
        yield* put(EthCallCRUD.actions.updateBatched(preCallTasks.map((t) => t.ethCall)));
        //All update contract
        yield* put(ContractCRUD.actions.updateBatched(contracts));

        const multicallContract = network.multicallContract;
        //If not Multicall, or from/defaultBlock specified
        const regularCallTasks = preCallTasks.filter((t) => {
            return !(
                multicallContract &&
                (!t.ethCall.from || t.ethCall.from == ADDRESS_0) &&
                (!t.ethCall.defaultBlock || t.ethCall.defaultBlock === 'latest')
            );
        });
        //Batch at smart-contract level with Multicall
        const multiCallTasks = preCallTasks.filter((t) => {
            return (
                multicallContract &&
                (!t.ethCall.from || t.ethCall.from == ADDRESS_0) &&
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
                    tx.call.request({ from: ADDRESS_0 }, (error: any, result: any) => {
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
                    return put(EthCallCRUD.actions.upsert({ ...ethCall, returnValue }));
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
                        return put(EthCallCRUD.actions.upsert({ ...ethCall, returnValue: formatedValue }));
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

export default callBatched;
