import { Contract } from '../../contract/model/interface.js';

export interface ContractIndex {
    readonly id?: string;
    readonly contracts?: Contract[];
}

export default ContractIndex;
