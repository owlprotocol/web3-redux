import { Contract } from '@owlprotocol/web3-redux';
import composeHooks from 'react-hooks-compose';
import InstancePresenter from '../InstancePresenter/index.js';

export interface useERC1155InstanceProps {
    networkId: string;
    address: string;
    tokenId: string;
}
export const useERC1155Instance = ({ networkId, address, tokenId }: useERC1155InstanceProps) => {
    const { metadata } = Contract.hooks.useERC1155(networkId, address, undefined, tokenId, {
        balanceOf: false,
        metadata: true,
    });
    return {
        imageSrc: metadata?.image,
        itemName: metadata?.name,
    };
};

const ERC1155Instance = composeHooks((props: useERC1155InstanceProps) => ({
    useERC1155Instance: () => useERC1155Instance(props),
}))(InstancePresenter) as (props: useERC1155InstanceProps) => JSX.Element;

//@ts-expect-error
ERC1155Instance.displayName = 'ERC1155Instance';

export { ERC1155Instance };
export default ERC1155Instance;
