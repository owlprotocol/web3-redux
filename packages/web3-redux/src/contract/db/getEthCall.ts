import EthCallCRUD from '../../ethcall/crud.js';
import ContractCRUD from '../crud.js';
import { BaseWeb3Contract } from '../model/index.js';

/**
 * Recursively searches for CID at file at <BASE_CID>/path/to/file
 */
export async function getEthCall<T extends BaseWeb3Contract = BaseWeb3Contract, K extends keyof T['methods'] = string>(
    state: any,
    networkId: string | undefined,
    address: string | undefined,
    method: K | undefined,
    args?: Parameters<T['methods'][K]>,
) {
    if (!networkId) throw new Error('networkId undefined');
    else if (!address) throw new Error('address undefined');
    else if (!method) throw new Error('method undefined');

    const contract = ContractCRUD.selectors.selectByIdSingle(state, { networkId, address });
    const web3Contract = contract?.web3Contract ?? contract?.web3SenderContract;
    const web3ContractMethod = web3Contract?.methods[method];

    if (web3ContractMethod) {
        let tx: any;
        if (!args || args.length == 0) tx = web3ContractMethod();
        else tx = web3ContractMethod(...args);

        const data = tx.encodeABI();
        const ethCall = await EthCallCRUD.db.get({
            networkId,
            to: address,
            data,
        });
        return ethCall;
    } else {
        return undefined;
    }
}

export default getEthCall;
