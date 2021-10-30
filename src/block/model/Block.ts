import BlockHeader from './BlockHeader';
import BlockTransaction from './BlockTransaction';

export type Block = BlockHeader | BlockTransaction;
export default Block;
