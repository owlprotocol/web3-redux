import { Box, Tag, Stack, CloseButton, useTheme } from '@chakra-ui/react';

export interface Props {
    address: string[];
    handleRemoveAddress: any;
}

const AddressList = ({ address = [], handleRemoveAddress }: Props) => {
    const { themes } = useTheme();

    return (
        <Box display={'flex'} alignItems={'center'}>
            <Stack spacing={3}>
                {address.map((address, key) => (
                    <Tag key={key} variant="solid" w={'100%'} bg={themes.color5}>
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} w={'100%'}>
                            <span>{address}</span>
                            <CloseButton onClick={handleRemoveAddress} />
                        </Box>
                    </Tag>
                ))}
            </Stack>
        </Box>
    );
};

export default AddressList;
