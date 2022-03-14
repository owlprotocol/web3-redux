import { BaseWeb3Contract } from './interface.js';
import { Sync } from '../../sync/model/index.js';

/**
 * Contract call object. Stores a cached contract call.
 *
 * @param value - Contract call return value.
 * @param defaultBlock - Call at a specific block height. Block number or "latest".
 * @param args - Call function arguments.
 * @param sync - {@link ContractCallSync} used to sync calls. defaultBlock MUST be "latest".
 */
export interface ContractCall<T extends BaseWeb3Contract = BaseWeb3Contract, K extends keyof T['methods'] = string> {
    value: any;
    defaultBlock: number | 'latest';
    args?: Parameters<T['methods'][K]>;
    sync: Sync['type'] | false;
}

export default ContractCall;
