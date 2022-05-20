import { Contract } from '@owlprotocol/web3-redux';
import composeHooks from 'react-hooks-compose';
import NFTPresenter from '../index';

export interface HookProps {
    networkId: string;
    address: string;
    tokenId: string;
}
export const useERC721Instance = ({ networkId, address, tokenId }: HookProps) => {
    const { ownerOf, metadata } = Contract.useERC721(networkId, address, tokenId, {
        metadata: true
    })
    return {
        networkId, ownerOf, imageSrc: metadata?.image, itemName: metadata?.name
    }
}

const ERC721Instance = composeHooks((props: HookProps) => ({
    useERC721Instance: () => useERC721Instance(props),
}))(NFTPresenter) as (props: HookProps) => JSX.Element;

//@ts-expect-error
ERC721Instance.displayName = 'ERC721Instance';

export { ERC721Instance };
export default ERC721Instance;
