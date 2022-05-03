import { Select, useTheme } from '@chakra-ui/react';

export interface Props {
    options: string[];
    placeholder?: string;
    isDisabled?: boolean;
}

const Dropdown = ({ options, placeholder = 'Select an item', isDisabled }: Props) => {
    const { themes } = useTheme();

    return (
        <Select placeholder={placeholder} bg={themes.color6} color={themes.color8} border={0} isDisabled={isDisabled}>
            {options.map((opt, key) => (
                <option value={opt} key={key}>
                    {opt}
                </option>
            ))}
        </Select>
    );
};

export default Dropdown;
