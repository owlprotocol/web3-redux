import { Contract } from '../../contract/model/interface.js';

export type CommonIndexIds = 'Favorites' | 'ERC20' | 'ERC721' | 'ERC1155';
export interface ContractIndex {
    readonly id?: CommonIndexIds | string;
    readonly contracts?: Contract[];
}

export default ContractIndex;
