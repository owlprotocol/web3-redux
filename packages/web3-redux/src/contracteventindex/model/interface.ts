import { ContractEvent } from '../../contractevent/model/interface.js';

export interface ContractEventIndex {
    readonly id?: string;
    readonly events?: ContractEvent[];
}

export default ContractEventIndex;
