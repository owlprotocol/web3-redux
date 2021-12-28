import ContractEvent from '../../contractevent/model/interface';

/** @internal */
export type Id = string;

export interface Interface {
    readonly id?: Id;
    readonly events?: ContractEvent[];
}

export default Interface;
