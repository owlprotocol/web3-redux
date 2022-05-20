import { useTheme, Box, IconButton, HStack, Image } from '@chakra-ui/react';
import Icon from '../Icon';
import { shortenHash } from '../../utils';
import NetworkIcon from '../NetworkIcon';

export interface PresenterProps {
    networkId: string;
    itemName: string;
    price: string;
    isSelected: boolean;
    //token: string;
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

export const NFTInstancePresenter = ({
    networkId,
    itemName = 'Placeholder',
    ownerOf, price, isSelected,
    handleFavorite,
    imageSrc = 'http://placehold.jp/228x196.png',
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
                {ownerOf && <Box color={themes.color9} fontWeight={400} fontSize={14}>
                    { /*<Avatar size="2xs" mr={2} />*/}
                    {shortenHash(ownerOf)}
                </Box>
                }
                <HStack>
                    { /** NFT Network */}
                    <NetworkIcon networkId={networkId} />
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
                    { /** TODO: Price currency Icon
                    <NetworkIcon networkId={networkId} />
                     */}
                </HStack>
            )}
        </Box>
    );
};

export default NFTInstancePresenter;
