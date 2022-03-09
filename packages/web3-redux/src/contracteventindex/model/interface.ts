import ContractEvent from '../../contractevent/model/interface';

export interface ContractEventIndex {
    readonly id?: string;
    readonly events?: ContractEvent[];
}

export default ContractEventIndex;
