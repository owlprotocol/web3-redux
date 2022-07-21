import { useTheme, VStack, HStack, Box } from '@chakra-ui/react';
import Icon from '../Icon/index.js';

export interface Props {
    stage: number;
    labels: string[];
    stageError?: number;
}

const DEFAULT_LABELS = ['', '', '', ''];

// @ts-ignore
const TransactionProgressBar = ({ stage, labels = DEFAULT_LABELS, stageError }: Props) => {
    const { themes } = useTheme();

    return (
        <HStack>
            {[...Array(4)].map((x, idx) => {
                const isAltColor = stage < idx + 1;
                const hasErrors = stageError === idx + 1;

                return (
                    <>
                        <HStack alignItems={'center'} justifyContent={'center'} pos={'relative'}>
                            <VStack
                                w={'32px'}
                                h={'32px'}
                                color={isAltColor ? themes.color6 : themes.color1}
                                border={'1px solid'}
                                borderRadius={50}
                                alignItems={'center'}
                                justifyContent={'center'}
                                borderColor={hasErrors ? themes.color10 : isAltColor ? themes.color6 : themes.color1}
                            >
                                {hasErrors ? (
                                    <Icon icon="ExclamationMark" size={16} />
                                ) : isAltColor ? (
                                    idx + 1
                                ) : (
                                    <Icon icon="FlowCheckMark" size={15} />
                                )}
                            </VStack>
                            <Box
                                w={'120px'}
                                h={'80px'}
                                position={'absolute'}
                                zIndex={1}
                                bottom={'-95px'}
                                textAlign={'center'}
                                overflow={'hidden'}
                                margin={'0 !important'}
                                color={hasErrors ? themes.color10 : isAltColor ? themes.color8 : themes.color1}
                            >
                                {labels[idx]}
                            </Box>
                        </HStack>
                        {idx !== 3 && (
                            <Box bg={stage <= idx + 1 ? themes.color6 : themes.color1} h={'2px'} w={'160px'} flex={1} />
                        )}
                    </>
                );
            })}
        </HStack>
    );
};

export default TransactionProgressBar;
