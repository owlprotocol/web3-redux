import { useTheme, Box, IconButton, HStack, Avatar, Image } from '@chakra-ui/react';
import { Contract } from '@owlprotocol/web3-redux';
import composeHooks from 'react-hooks-compose';
import Icon from '../Icon';
import { shortenHash } from '../../utils';


export interface HookProps {
    networkId: string;
    address: string;
    tokenId: string;
}
export const useSingleNFTInstance = ({ networkId, address, tokenId }: HookProps) => {
    const { name, symbol, ownerOf, tokenURI, metadata, contentId } = Contract.useERC721(networkId, address, tokenId)
    console.debug({ name })
    return {
        name, symbol, ownerOf, tokenURI, metadata, contentId
    }
}

export interface PresenterProps {
    itemName: string;
    price: string;
    isSelected: boolean;
    token: string;
    handleFavorite: any;
    imageSrc?: string;
    imageAlt?: string;
    name: string | undefined,
    symbol: string | undefined,
    ownerOf: string | undefined,
    tokenURI: string | undefined,
    metadata: any | undefined,
    contentId: string | undefined
}

export const SingleNFTInstancePresenter = ({
    itemName, ownerOf, price, isSelected, token, handleFavorite,
    imageSrc = 'https://bit.ly/dan-abramov',
    imageAlt = 'Placeholder' }: PresenterProps) => {
    const { themes } = useTheme();

    return (
        <Box
            bg={themes.color5}
            p={'16px 16px 12px 16px'}
            borderRadius={12}
            w={'100%'}
            maxW={264}
            border={'2px solid'}
            borderColor={isSelected ? themes.color1 : themes.color5}
            boxShadow={'md'}
        >
            <Box bg={themes.color6} marginBottom={'16px'} borderRadius={16} w={'100%'} h={'196px'}>
                <Image src={imageSrc} borderRadius={16} w={'100%'} h={'196px'} alt={imageAlt} />
            </Box>
            <Box
                color={themes.color7}
                p={'6px'}
                marginBottom={'16px'}
                border="2px solid"
                borderColor={themes.color6}
                borderRadius={16}
                w={'100%'}
                textAlign="center"
                fontWeight={700}
                fontSize={14}
            >
                {itemName}
            </Box>
            <HStack justifyContent="space-between">
                <Box color={themes.color9} fontWeight={400} fontSize={14}>
                    <Avatar size="2xs" mr={2} />
                    {shortenHash(ownerOf ?? '')}
                </Box>
                <HStack>
                    {!price && <Icon icon={token} w="20px" h="20px" />}
                    <IconButton
                        onClick={handleFavorite}
                        icon={<Icon icon="heart" w="18" />}
                        bg={'transparent'}
                        aria-label="mark as favorite"
                        mr={'-12px'}
                    />
                </HStack>
            </HStack>
            {price && (
                <HStack justifyContent="space-between">
                    <Box color={themes.color9} fontWeight={600} fontSize={14}>
                        {price} ETH
                    </Box>
                    <Icon icon="ETH" w="20px" h="20px" />
                </HStack>
            )}
        </Box>
    );
};

const SingleNFTInstance = composeHooks((props: HookProps) => ({
    useSingleNFTInstance: () => useSingleNFTInstance(props),
}))(SingleNFTInstancePresenter) as (props: HookProps) => JSX.Element;

//@ts-expect-error
SingleNFTInstance.displayName = 'SingleNFTInstance';

export { SingleNFTInstance };
export default SingleNFTInstance;
