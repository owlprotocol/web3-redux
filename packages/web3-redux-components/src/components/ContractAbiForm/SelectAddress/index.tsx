import { Select } from 'chakra-react-select';
import { useSelector } from 'react-redux';
import { Contract, ContractIndex } from '@owlprotocol/web3-redux';
import { useForm, useController } from 'react-hook-form';
import { intersection } from 'lodash';

//https://codesandbox.io/s/648uv
//https://codesandbox.io/s/chakra-react-select-react-hook-form-usecontroller-single-select-typescript-v3-3hvkm
//https://github.com/csandman/chakra-react-select/tree/v3#react-hook-form
export interface Props {
    networkId: string | undefined;
    indexFilter: string[] | undefined;
    onChangeHandler?: (value: string | undefined | any) => void;
}
export const SelectAddress = ({
    networkId,
    indexFilter,
    onChangeHandler = (value) => console.log(`SelectAddress.onChange(${value})`),
}: Props) => {
    const indexList = useSelector((state) => ContractIndex.selectByIdMany(state, indexFilter)) ?? [];
    const contractsByIndexList = useSelector((state) => ContractIndex.selectContractsMany(state, indexFilter)) ?? [];

    const options = indexList.map((contractIdx, idx) => {
        return {
            label: contractIdx!.id,
            options: contractsByIndexList[idx]
                ?.filter((c) => c.networkId === networkId)
                .map((c) => {
                    return { label: c.address, value: c.address };
                }),
        };
    });
    console.debug({ indexList, contractsByIndexList });

    const contractsAllList = useSelector((state) => Contract.selectByFilter(state, { networkId })) ?? [];
    ///TODO: Replace with label filter check
    const contractsUnLabelled = contractsAllList
        .filter((c) => {
            if (!c.indexIds) return true;
            //Not in filter
            const intersect = intersection(c.indexIds, indexFilter);
            return intersect.length == 0;
        })
        .map((c) => {
            return { label: c.address, value: c.address };
        });
    options.push({ label: 'Other', options: contractsUnLabelled });

    console.debug({ options });

    const { control } = useForm<{ address: string | undefined }>({});
    const {
        field: { ref },
    } = useController<{ address: string | undefined }>({ name: 'address', control });

    return (
        <Select
            ref={ref}
            placeholder="Select address"
            options={options}
            //@ts-ignore
            onChange={(data) => onChangeHandler(data?.value)}
        />
    );
};

export default SelectAddress;
