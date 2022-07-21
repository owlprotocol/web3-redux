import { useTheme, Box, Image, Flex, Skeleton } from '@chakra-ui/react';
import Icon from '../../Icon';
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
    assetPreviewSrc = 'http://placehold.jp/196x196.png',
}: NFTItemCardProps) => {
    const { themes } = useTheme();

    return (
        <Box
            p={'8px 12px'}
            w={'168px'}
            pb={3}
            borderRadius={4}
            bg={themes.color6}
            boxShadow={'inset 0px 4px 4px rgba(0, 0, 0, 0.25)'}
        >
            <Box marginBottom={3} w={'100%'} h={'108px'} overflow={'hidden'} borderRadius={4}>
                {assetPreviewSrc ? (
                    <Image src={assetPreviewSrc} w={'100%'} h={'100%'} objectFit={'scale-down'} />
                ) : (
                    <Skeleton h={'100%'} speed={1} />
                )}
            </Box>

            <Box color={themes.color7} w={'100%'} fontWeight={700} fontSize={14}>
                {itemName}
            </Box>

            <Flex justifyContent={'space-between'} alignItems={'center'} color={themes.color9} fontSize={12}>
                {tokenName && <Box>{tokenName}</Box>}
                {generateTime && (
                    <Flex alignItems={'center'} mt={1} ml={-1}>
                        <Icon icon={'Clock'} size={18} mr={1} />
                        Slow ({Math.floor(generateTime / 60)})m
                    </Flex>
                )}
            </Flex>
        </Box>
    );
};

export default NFTItemCard;
