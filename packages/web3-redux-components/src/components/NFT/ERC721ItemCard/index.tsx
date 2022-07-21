import { Contract } from '@owlprotocol/web3-redux';
import composeHooks from 'react-hooks-compose';
import ItemCardPresenter from '../ItemCardPresenter/index.js';

export interface useERC721ItemCardProps {
    networkId: string;
    address: string;
    tokenId: string;
    itemName: string;
    assetPreviewSrc: string;
}
export const useERC721ItemCard = ({ networkId, address, tokenId }: useERC721ItemCardProps) => {
    const { metadata } = Contract.hooks.useERC721(networkId, address, tokenId, {
        metadata: true,
    });
    return {
        itemName: metadata?.name,
        assetPreviewSrc: metadata?.image,
    };
};

const ERC721ItemCard = composeHooks((props: useERC721ItemCardProps) => ({
    useERC721ItemCard: () => useERC721ItemCard(props),
}))(ItemCardPresenter) as (props: useERC721ItemCardProps) => JSX.Element;

//@ts-expect-error
ERC721ItemCard.displayName = 'ERC721ItemCard';

export { ERC721ItemCard };
export default ERC721ItemCard;
