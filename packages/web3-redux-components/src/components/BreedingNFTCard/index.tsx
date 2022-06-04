import { useTheme, Box, HStack } from '@chakra-ui/react';
import { FileUploadImage } from '../FileUpload';
import Icon from '../Icon';

export interface PresenterProps {
    itemName?: string;
    generation?: string;
    generateTime?: number;
}

export const BreedingNFTCard = ({ itemName = 'NFT Name', generation, generateTime = 1 }: PresenterProps) => {
    const { themes } = useTheme();

    return (
        <Box bg={themes.color5} p={'16px 16px 12px 16px'} borderRadius={12} w={'100%'} maxW={264} boxShadow={'md'}>
            <Box bg={themes.color6} marginBottom={'16px'} borderRadius={16} w={'100%'} h={'196px'} overflow={'hidden'}>
                <FileUploadImage
                    accept={'image/*'}
                    buttonStyle={{ bg: 'transparent', w: '100%', borderRadius: 0, fontSize: 14 }}
                />
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
                <Icon icon="DNA" size={18} />
                <Box>Gen {generation}</Box>
                <Icon icon="Clock" size={18} />
                <Box>Very quick ({Math.floor(generateTime / 60)})m</Box>
            </HStack>
        </Box>
    );
};

export default BreedingNFTCard;
