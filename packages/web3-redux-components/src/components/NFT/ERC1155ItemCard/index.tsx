import { Contract } from '@owlprotocol/web3-redux';
import composeHooks from 'react-hooks-compose';
import ItemCardPresenter from '../ItemCardPresenter/index.js';

export interface useERC1155ItemCardProps {
    networkId: string;
    address: string;
    tokenId: string;
    itemName: string;
    assetPreviewSrc: string;
}
export const useERC1155ItemCard = ({ networkId, address, tokenId }: useERC1155ItemCardProps) => {
    const { metadata } = Contract.hooks.useERC1155(networkId, address, undefined, tokenId, {
        balanceOf: false,
        metadata: true,
    });
    return {
        itemName: metadata?.name,
        assetPreviewSrc: metadata?.image,
    };
};

const ERC1155ItemCard = composeHooks((props: useERC1155ItemCardProps) => ({
    useERC1155ItemCard: () => useERC1155ItemCard(props),
}))(ItemCardPresenter) as (props: useERC1155ItemCardProps) => JSX.Element;

//@ts-expect-error
ERC1155ItemCard.displayName = 'ERC1155ItemCard';

export { ERC1155ItemCard };
export default ERC1155ItemCard;
