import { useTheme, Box, Image, Flex } from '@chakra-ui/react';
import Icon from '../Icon';
export interface NFTItemCardProps {
    itemName?: string;
    tokenName?: string;
    generateTime?: number;
    assetPreviewSrc?: string;
}

export const NFTItemCard = ({
    itemName,
    tokenName,
    generateTime = 1,
    assetPreviewSrc = 'http://placehold.jp/228x196.png',
}: NFTItemCardProps) => {
    const { themes } = useTheme();

    return (
        <Box
            p={'8px 12px'}
            w={'168px'}
            h={'168px'}
            borderRadius={4}
            bg={themes.color6}
            boxShadow={'inset 0px 4px 4px rgba(0, 0, 0, 0.25)'}
        >
            <Box marginBottom={2} w={'100%'} h={'108px'} overflow={'hidden'} borderRadius={4}>
                <Image src={assetPreviewSrc} w={'100%'} h={'100%'} objectFit={'scale-down'} />
            </Box>

            <Box color={themes.color7} marginBottom={1} w={'100%'} fontWeight={700} fontSize={14}>
                {itemName}
            </Box>

            <Flex justifyContent={'space-between'} alignItems={'center'} color={themes.color9} fontSize={12}>
                <Box>{tokenName}</Box>
                <Flex alignItems={'center'}>
                    <Icon icon={'Clock'} size={18} mr={1} />
                    Slow ({Math.floor(generateTime / 60)})m
                </Flex>
            </Flex>
        </Box>
    );
};

export default NFTItemCard;
