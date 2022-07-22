import { Image } from '@chakra-ui/react';
import { Contract } from '@owlprotocol/web3-redux';

export interface ERC1155ImageProps {
    networkId: string;
    address: string;
    tokenId: string;
}

export const ERC1155Image = ({ networkId, address, tokenId }: ERC1155ImageProps) => {
    const { metadata } = Contract.hooks.useERC1155(networkId, address, undefined, tokenId, {
        balanceOf: false,
        metadata: true,
    });
    const src = metadata?.image;
    return <Image src={src} w={'100%'} h={'100x'} objectFit={'scale-down'} cursor={'pointer'} />;
};
