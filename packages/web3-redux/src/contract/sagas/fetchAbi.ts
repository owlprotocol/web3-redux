import { select, put, call } from 'typed-redux-saga';
import { AxiosResponse } from 'axios';
import { AbiItem } from '../../utils/web3-utils/index.js';
import { FetchAbiAction } from '../actions/index.js';
import ContractCRUD from '../crud.js';
import loadNetwork from '../../network/sagas/loadNetwork.js';
/** @category Sagas */
export function* fetchAbi(action: FetchAbiAction) {
    const { payload } = action;
    const { networkId, address } = payload;

    const network = yield* call(loadNetwork, networkId);
    if (!network) throw new Error(`Network ${networkId} undefined`);

    const apiClient = network?.explorerApiClient;
    if (!apiClient) throw new Error(`Network ${networkId} missing apiClient`);

    const contract = yield* select(ContractCRUD.selectors.selectByIdSingle, { networkId, address });
    if (!contract) yield* put(ContractCRUD.actions.upsert({ networkId, address }));

    const options = {
        params: {
            module: 'contract',
            action: 'getabi',
            address,
        },
    };

    const response = (yield* call(apiClient.get as any, '/', options)) as AxiosResponse;
    const abi = JSON.parse(response.data?.result) as AbiItem[];

    yield* put(ContractCRUD.actions.update({ networkId, address, abi }));
}

export default fetchAbi;
