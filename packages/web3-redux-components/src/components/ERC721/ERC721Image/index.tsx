import { Image, Skeleton } from '@chakra-ui/react';
import { Contract } from '@owlprotocol/web3-redux';
import { memo } from 'react';

export interface ERC721ImageProps {
    networkId: string | undefined;
    address: string | undefined;
    tokenId: string | undefined;
}

const ERC721Image = memo(({ networkId, address, tokenId }: ERC721ImageProps) => {
    const { metadata } = Contract.hooks.useERC721(networkId, address, tokenId, {
        ownerOf: false,
        metadata: true,
    });
    const src = metadata?.image;

    if (src) return <Image src={src} w={'100%'} h={'100x'} objectFit={'scale-down'} cursor={'pointer'} />;

    return <Skeleton w={'100%'} h={'100%'} speed={1} />;
});

ERC721Image.displayName = 'ERC721Image';
export { ERC721Image };
