import { Contract } from '@owlprotocol/web3-redux';
import composeHooks from 'react-hooks-compose';
import ItemCardPresenter from '../ItemCardPresenter';

export interface HookProps {
    networkId: string;
    address: string;
    tokenId: string;
    itemName: string;
    assetPreviewSrc: string;
}
export const useERC721ItemCard = ({ networkId, address, tokenId }: HookProps) => {
    const { ownerOf, metadata } = Contract.useERC721(networkId, address, tokenId, {
        metadata: true,
    });
    return {
        itemName: metadata?.name, 
        assetPreviewSrc: metadata?.image,
    };
};

const ERC721ItemCard = composeHooks((props: HookProps) => ({
    useERC721ItemCard: () => useERC721ItemCard(props),
}))(ItemCardPresenter) as (props: HookProps) => JSX.Element;

//@ts-expect-error
ERC721ItemCard.displayName = 'ERC721ItemCard';

export { ERC721ItemCard };
export default ERC721ItemCard;

