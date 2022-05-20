import { Contract } from '@owlprotocol/web3-redux';
import composeHooks from 'react-hooks-compose';
import NFTPresenter from '../index';

export interface HookProps {
    networkId: string;
    address: string;
    tokenId: string;
}
export const useERC1155Instance = ({ networkId, address, tokenId }: HookProps) => {
    const { metadata } = Contract.useERC1155(networkId, address, undefined, tokenId, { balanceOf: false, metadata: true })
    return {
        networkId, imageSrc: metadata?.image, itemName: metadata?.name
    }
}

const ERC1155Instance = composeHooks((props: HookProps) => ({
    useERC1155Instance: () => useERC1155Instance(props),
}))(NFTPresenter) as (props: HookProps) => JSX.Element;

//@ts-expect-error
ERC1155Instance.displayName = 'ERC1155Instance';

export { ERC1155Instance };
export default ERC1155Instance;
