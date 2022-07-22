import { Image } from '@chakra-ui/react';
import { Contract } from '@owlprotocol/web3-redux';

export interface ERC721ImageProps {
    networkId: string;
    address: string;
    tokenId: string;
}

export const ERC721Image = ({ networkId, address, tokenId }: ERC721ImageProps) => {
    const { metadata } = Contract.hooks.useERC721(networkId, address, tokenId, {
        ownerOf: false,
        metadata: true,
    });
    const src = metadata?.image;
    return <Image src={src} w={'100%'} h={'100x'} objectFit={'scale-down'} cursor={'pointer'} />;
};
