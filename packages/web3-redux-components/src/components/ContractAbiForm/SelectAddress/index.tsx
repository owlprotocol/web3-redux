import { Select } from 'chakra-react-select';
import { useSelector } from 'react-redux';
import { Contract } from '@owlprotocol/web3-redux';
import { useForm, useController } from 'react-hook-form';

//https://codesandbox.io/s/648uv?file=/chakra-react-select.js
//https://github.com/csandman/chakra-react-select/tree/v3#react-hook-form
export interface Props {
    networkId: string | undefined;
    labelsFilter: string[] | undefined;
    onChangeHandler?: (value: string | undefined) => void;
}
export const SelectAddress = ({
    networkId,
    //labelsFilter,
    onChangeHandler = (value) => console.log(`SelectAddress.onChange(${value})`),
}: Props) => {
    let contractsList = useSelector((state) => Contract.selectByIdMany(state)) ?? [];

    if (networkId) contractsList = contractsList.filter((c) => c?.networkId === networkId);

    const addressList = contractsList.map((c) => {
        return { label: c?.address, value: c?.address };
    });

    const { control } = useForm<{ address: string | undefined }>({});
    const {
        field: { ref },
    } = useController<{ address: string | undefined }>({ name: 'address', control });

    return (
        <Select
            ref={ref}
            placeholder="Select address"
            options={addressList}
            onChange={(data) => onChangeHandler(data?.value)}
        />
    );
};

export default SelectAddress;
