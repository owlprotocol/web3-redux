import { useTheme, Box, IconButton, HStack, Image, Skeleton, VStack } from '@chakra-ui/react';
import Icon from '../../Icon/index.js';
import { FileUploadImage } from '../../FileUpload/index.js';

export interface PresenterProps {
    ownerName: string;
    isSelected?: boolean;
    isFavorite?: boolean;
    handleFavorite?: any;
    imageSrc?: string;
    imageAlt?: string;
    name?: string | undefined;
    symbol?: string | undefined;
    tokenURI?: string | undefined;
    metadata?: any | undefined;
    contentId?: string | undefined;
    editable?: boolean | undefined;
}

export const NFTSingleItemPresenter = ({
    ownerName,
    isSelected,
    isFavorite,
    handleFavorite,
    imageSrc,
    imageAlt = '',
    editable = false,
}: PresenterProps) => {
    const { themes } = useTheme();

    return (
        <Box
            bg={themes.color5}
            p={'0px 16px 12px 16px'}
            borderRadius={12}
            w={'100%'}
            maxW={552}
            border={'2px solid'}
            borderColor={isSelected ? themes.color1 : themes.color5}
            boxShadow={'md'}
        >
            <HStack justifyContent="space-between">
                <div
                    style={{
                        color: '#4447E2',
                        fontSize: '14px',
                        fontWeight: 600,
                    }}
                >
                    Category
                </div>

                {handleFavorite && (
                    <IconButton
                        onClick={handleFavorite}
                        icon={isFavorite ? <Icon icon="heart.active" size={18} /> : <Icon icon="heart" size={18} />}
                        bg={'transparent'}
                        aria-label="mark as favorite"
                    />
                )}
            </HStack>
            <Box bg={themes.color6} marginBottom={'16px'} borderRadius={16} w={'100%'} h={'196px'} overflow={'hidden'}>
                {editable ? (
                    <FileUploadImage
                        accept={'image/*'}
                        buttonStyle={{ bg: 'transparent', w: '100%', borderRadius: 0, fontSize: 14 }}
                    />
                ) : imageSrc ? (
                    <Image
                        src={imageSrc}
                        borderRadius={16}
                        w={'100%'}
                        h={'196px'}
                        alt={imageAlt}
                        objectFit={'scale-down'}
                    />
                ) : (
                    <Skeleton h={'100%'} speed={1} />
                )}
            </Box>

            <VStack alignItems={'flex-start'}>
                <Box color={'#4447E2'} fontSize={14}>
                    Creator
                </Box>
                <Box color={themes.color9} fontWeight={600} fontSize={14}>
                    The amazing art #2102 Reforming and evolving (Citymap)
                </Box>
            </VStack>

            <hr
                style={{
                    borderColor: '#2C2C30',
                    marginTop: '10px',
                    marginBottom: '10px',
                }}
            />

            <HStack justifyContent="space-between">
                {ownerName && (
                    <Box color={themes.color9} fontWeight={400} fontSize={14}>
                        Owned By <span style={{ color: '#4447E2', fontWeight: 600 }}>{ownerName}</span>
                    </Box>
                )}

                <HStack>
                    <Icon icon="view" size={18} />
                    <Box color={themes.color9} fontWeight={400} fontSize={14}>
                        272 views
                    </Box>

                    <Icon icon="heart.active" size={18} />
                    <Box color={themes.color9} fontWeight={400} fontSize={14}>
                        8 favourites
                    </Box>
                </HStack>
            </HStack>
        </Box>
    );
};

export default NFTSingleItemPresenter;
