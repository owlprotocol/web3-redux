import { Contract } from '@owlprotocol/web3-redux';
import composeHooks from 'react-hooks-compose';
import InstancePresenter from '../InstancePresenter';

export interface HookProps {
    networkId: string;
    address: string;
    tokenId: string;
}
export const useERC721Instance = ({ networkId, address, tokenId }: HookProps) => {
    const { ownerOf, metadata } = Contract.useERC721(networkId, address, tokenId, {
        metadata: true,
    });
    return {
        ownerOf,
        imageSrc: metadata?.image,
        itemName: metadata?.name,
    };
};

const ERC721Instance = composeHooks((props: HookProps) => ({
    useERC721Instance: () => useERC721Instance(props),
}))(InstancePresenter) as (props: HookProps) => JSX.Element;

//@ts-expect-error
ERC721Instance.displayName = 'ERC721Instance';

export { ERC721Instance };
export default ERC721Instance;
