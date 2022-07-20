import { useTheme, Box, Text, IconButton, HStack, Image, Skeleton, Tooltip } from '@chakra-ui/react';
import { ReactComponent as PreMintIcon } from './assets/premint.svg';
import Icon from '../Icon';
import { shortenHash } from '../../utils';
import NetworkIcon from '../NetworkIcon';
import { FileUploadImage } from '../FileUpload';

export interface PresenterProps {
    itemName: string;
    networkId?: string;
    price?: string;
    isSelected?: boolean;
    isFavorite?: boolean;
    handleFavorite?: any;
    imageSrc?: string;
    imageAlt?: string;
    name?: string | undefined;
    symbol?: string | undefined;
    ownerOf?: string | undefined;
    tokenURI?: string | undefined;
    metadata?: any | undefined;
    contentId?: string | undefined;
    editable?: boolean | undefined;
    preMint?: boolean | undefined;
    onClick?: any | undefined;
}

export const NFTInstancePresenter = ({
    itemName = '',
    networkId,
    ownerOf,
    price,
    isSelected,
    isFavorite,
    handleFavorite,
    imageSrc,
    imageAlt = '',
    editable = false,
    preMint = false,
    onClick,
}: PresenterProps) => {
    const { themes } = useTheme();
    const clickHandler = (e: PointerEvent) => {
        e.stopPropagation();
        e.preventDefault();
        console.log('hi mom ');
        onClick && onClick();
    };

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
                        // @ts-ignore
                        onClick={clickHandler}
                        cursor={'pointer'}
                    />
                ) : (
                    <Skeleton h={'100%'} speed={1} />
                )}
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
                // @ts-ignore
                onClick={clickHandler}
                cursor={'pointer'}
            >
                {itemName}
            </Box>
            {!editable && (
                <HStack justifyContent="space-between">
                    {ownerOf && (
                        <Box color={themes.color9} fontWeight={400} fontSize={14}>
                            {/*<Avatar size="2xs" mr={2} />*/}
                            {shortenHash(ownerOf)}
                        </Box>
                    )}

                    <HStack>
                        {/** NFT Network */}
                        {networkId && <NetworkIcon networkId={networkId} size={18} />}
                        {handleFavorite && (
                            <IconButton
                                onClick={handleFavorite}
                                icon={
                                    isFavorite ? (
                                        <Icon icon="heart.active" size={18} />
                                    ) : (
                                        <Icon icon="heart" size={18} />
                                    )
                                }
                                bg={'transparent'}
                                aria-label="mark as favorite"
                            />
                        )}
                    </HStack>
                </HStack>
            )}

            {price && (
                <HStack justifyContent="space-between">
                    <Box color={themes.color9} fontWeight={600} fontSize={14}>
                        {price} ETH
                    </Box>
                    {editable && <NetworkIcon networkId={networkId} size={18} />}
                </HStack>
            )}

            {preMint && (
                <HStack
                    mr={3} // @ts-ignore
                    onClick={clickHandler}
                    cursor={'pointer'}
                >
                    <Box boxSize={9}>
                        <PreMintIcon />
                    </Box>
                    <Text color={themes.color9} fontSize={16} flex={1}>
                        Pre mint a new NFT
                    </Text>
                    <Tooltip label="Place more information here about this item">
                        <Box boxSize={4}>
                            <Icon icon={'QuestionMark'} size={15} />
                        </Box>
                    </Tooltip>
                </HStack>
            )}
        </Box>
    );
};

export default NFTInstancePresenter;
