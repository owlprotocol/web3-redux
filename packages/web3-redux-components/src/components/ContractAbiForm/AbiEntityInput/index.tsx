import { useTheme, Input, FormControl, FormErrorMessage } from '@chakra-ui/react';

export interface Props {
    type: string;
    name: string;
    onChange?: any;
    errMsg?: string;
}

const AbiEntityInput = ({ type, name, onChange, errMsg }: Props) => {
    const placeholder = `${name} (${type})`;
    const { themes } = useTheme();

    return (
        <FormControl isInvalid={!!errMsg} pos={'relative'} mb={3}>
            <Input
                type="text"
                p={4}
                border={0}
                w={'100%'}
                borderRadius={8}
                bg={themes.color6}
                color={themes.color8}
                placeholder={placeholder}
                _placeholder={{ color: themes.color8 }}
                onChange={({ target }: any) => onChange(name, target.value, type)}
            />
            {errMsg && <FormErrorMessage>*{errMsg}</FormErrorMessage>}
        </FormControl>
    );
};

export default AbiEntityInput;
