import { useTheme, HStack, Box, Badge } from '@chakra-ui/react';
import Icon from '../Icon/index.js';

export interface Props {
    token: string;
    value: string;
    dollarValue: string;
    isSelected: boolean;
}

const TokenSlot = ({ token, value, dollarValue, isSelected }: Props) => {
    const { themes } = useTheme();

    return (
        <Box
            bg={themes.color5}
            w={'100%'}
            maxW={246}
            p={'16px'}
            borderRadius={12}
            borderColor={isSelected ? themes.color1 : themes.color5}
            boxShadow={'md'}
        >
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
                {token}
            </Box>

            <Box
                bg={themes.color5}
                p="7px 12px"
                border="6px solid"
                borderColor={themes.color6}
                borderRadius={12}
                boxShadow={'md'}
            >
                <HStack justifyContent={'space-between'}>
                    <Box color={themes.color9} fontWeight={600} fontSize={18}>
                        {value}
                    </Box>
                    <HStack>
                        <Icon icon="ETH" size={20} />
                        <Badge>{token}</Badge>
                    </HStack>
                </HStack>
                <HStack>
                    <Box color={themes.color9} fontWeight={600} fontSize={14}>
                        {dollarValue}$
                    </Box>
                </HStack>
            </Box>
        </Box>
    );
};

export default TokenSlot;
