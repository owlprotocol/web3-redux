import { useTheme, Box, Flex, HStack, Image, CloseButton } from '@chakra-ui/react';
import Icon from '../Icon/index.js';

export interface PresenterProps {
    itemName?: string;
    generation?: string;
    generateTime?: number;
    addAssetHandler?: any;
    assetPreviewSrc?: string | undefined;
    removeAssetHandler?: any;
}

export const BreedingNFTCard = ({
    itemName = 'NFT Name',
    generation,
    generateTime,
    addAssetHandler,
    assetPreviewSrc,
    removeAssetHandler,
}: PresenterProps) => {
    const { themes } = useTheme();

    return (
        <Box bg={themes.color5} p={'16px 16px 12px 16px'} borderRadius={12} w={'100%'} maxW={264} boxShadow={'md'}>
            <Box bg={themes.color6} marginBottom={'16px'} borderRadius={16} w={'100%'} h={'196px'} overflow={'hidden'}>
                {assetPreviewSrc ? (
                    <Box position={'relative'}>
                        {removeAssetHandler && (
                            <CloseButton
                                position={'absolute'}
                                zIndex={2}
                                right={0}
                                m={2}
                                bg={themes.color6}
                                borderRadius={50}
                                boxSize={7}
                                onClick={removeAssetHandler}
                            />
                        )}
                        <Image src={assetPreviewSrc} w={'100%'} h={'100%'} objectFit={'scale-down'} />
                    </Box>
                ) : (
                    <Flex
                        alignItems={'center'}
                        justifyContent={'center'}
                        h={'100%'}
                        onClick={addAssetHandler}
                        cursor={'pointer'}
                    >
                        <Icon icon="AddRounded" size={40} />
                    </Flex>
                )}
            </Box>
            <Box
                color={themes.color7}
                p={'6px'}
                marginBottom={'12px'}
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

            <HStack justifyContent="center" fontSize={12} color={themes.color9}>
                {generation && (
                    <>
                        <Icon icon="DNA" size={18} />
                        <Box>Gen {generation}</Box>
                    </>
                )}
                {generateTime && (
                    <>
                        <Icon icon="Clock" size={18} />
                        <Box>Very quick ({Math.floor(generateTime / 60)})m</Box>
                    </>
                )}
            </HStack>
        </Box>
    );
};

export default BreedingNFTCard;
