import { useTheme, Input, FormControl, FormErrorMessage, Box } from '@chakra-ui/react';
import Icon from '../Icon';

export interface Props {
    onChange: () => any;
    placeholder: string;
    errMsg?: string;
    icon?: string;
}

const InputField = ({ icon, onChange, placeholder, errMsg }: Props) => {
    const { themes } = useTheme();

    return (
        <FormControl isInvalid={!!errMsg} pos={'relative'}>
            {icon && (
                <Box pos={'absolute'} zIndex={1} m={'9px'}>
                    <Icon icon={icon} w={'20px'} h={'20px'} />
                </Box>
            )}
            <Input
                type="text"
                onChange={onChange}
                placeholder={placeholder}
                color={themes.color8}
                _placeholder={{ color: themes.color8 }}
                bg={themes.color6}
                border={0}
                w={'100%'}
                borderRadius={8}
                p={icon ? '2px 38px' : 4}
            />
            {errMsg && <FormErrorMessage>*{errMsg}</FormErrorMessage>}
        </FormControl>
    );
};

export default InputField;
