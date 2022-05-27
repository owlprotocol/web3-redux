import { useTheme, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { Select, CreatableSelect } from 'chakra-react-select';
import { useSelector } from 'react-redux';
import { Contract, ContractIndex } from '@owlprotocol/web3-redux';
import { useForm, useController } from 'react-hook-form';
import { intersection } from 'lodash';
import Web3 from 'web3';
import { useCallback, useState } from 'react';

const web3 = new Web3();
const coder = web3.eth.abi;

//https://codesandbox.io/s/648uv
//https://codesandbox.io/s/chakra-react-select-react-hook-form-usecontroller-single-select-typescript-v3-3hvkm
//https://github.com/csandman/chakra-react-select/tree/v3#react-hook-form
export interface Props {
    networkId: string | undefined;
    indexFilter?: string[] | undefined;
    showOtherAddresses?: boolean;
    creatable?: boolean;
    onChangeHandler?: (value: string | undefined, error: Error | undefined) => void;
}
export const SelectAddress = ({
    networkId,
    indexFilter,
    showOtherAddresses = false,
    creatable = false,
    onChangeHandler = (value) => console.log(`SelectAddress.onChange(${value})`),
}: Props) => {
    const { themes } = useTheme();

    const [error, setError] = useState<Error | undefined>();
    const [, setValue] = useState<string | undefined>();

    const indexList = useSelector((state) => ContractIndex.selectByIdMany(state, indexFilter)) ?? [];
    const contractsByIndexList = useSelector((state) => ContractIndex.selectContractsMany(state, indexFilter)) ?? [];

    const options = indexList.map((contractIdx, idx) => {
        return {
            label: contractIdx?.id ?? 'Other',
            options: contractsByIndexList[idx]
                ?.filter((c) => c.networkId === networkId)
                .map((c) => {
                    return { label: c.address, value: c.address };
                }),
        };
    });

    const contractsAllList = useSelector((state) => Contract.selectByFilter(state, { networkId })) ?? [];
    if (showOtherAddresses) {
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
    }

    const { control } = useForm<{ address: string | undefined }>({});
    const {
        field: { ref },
    } = useController<{ address: string | undefined }>({ name: 'address', control });

    const onChangeValidate = useCallback(
        (_value: string) => {
            if (typeof _value == 'boolean') {
                setError(undefined);
                setValue(_value);
                onChangeHandler(_value, undefined);
                return;
            }

            //Empty
            if (_value.length == 0) {
                setError(undefined);
                setValue(undefined);
                onChangeHandler(undefined, undefined);
                return;
            }

            //Address
            //TODO: Update input field value
            if (Web3.utils.isAddress(_value.toLowerCase())) {
                _value = Web3.utils.toChecksumAddress(_value);
            }

            //Validate
            try {
                coder.encodeParameter('address', _value);
                //Format is valid
                setError(undefined);
                setValue(_value);
                onChangeHandler(_value, undefined);
            } catch (_error: any) {
                setError(_error);
                setValue(_value);
                onChangeHandler(_value, _error);
                return;
            }
        },
        [onChangeHandler],
    );

    return (
        <>
            <FormControl isInvalid={!!error}>
                {creatable ? (
                    <CreatableSelect
                        ref={ref}
                        placeholder="Select address"
                        //@ts-ignore
                        options={options}
                        //@ts-ignore
                        onChange={(data) => onChangeValidate(data?.value)}
                        chakraStyles={{
                            container: (provided) => ({
                                ...provided,
                                bg: themes.color6,
                                color: themes.color8,
                                border: 0,
                                borderColor: themes.color6,
                                borderRadius: '8px',
                                p: '6px 4px',
                            }),
                            downChevron: (provided) => ({
                                ...provided,
                                color: themes.color8,
                                w: 24,
                                h: 24,
                            }),
                            placeholder: (provided) => ({
                                ...provided,
                                color: themes.color8,
                                fontWeight: 600,
                                fontSize: 16,
                            }),
                            dropdownIndicator: (provided) => ({
                                ...provided,
                                bg: themes.color6,
                            }),
                            indicatorSeparator: (provided) => ({
                                ...provided,
                                display: 'none',
                            }),
                        }}
                    />
                ) : (
                    <Select
                        ref={ref}
                        placeholder="Select address"
                        options={options}
                        //@ts-ignore
                        onChange={(data) => onChangeValidate(data?.value)}
                        chakraStyles={{
                            container: (provided) => ({
                                ...provided,
                                bg: themes.color6,
                                color: themes.color8,
                                border: 0,
                                borderColor: themes.color6,
                                borderRadius: '8px',
                                p: '6px 4px',
                            }),
                            downChevron: (provided) => ({
                                ...provided,
                                color: themes.color8,
                                w: 24,
                                h: 24,
                            }),
                            placeholder: (provided) => ({
                                ...provided,
                                color: themes.color8,
                                fontWeight: 600,
                                fontSize: 16,
                            }),
                            dropdownIndicator: (provided) => ({
                                ...provided,
                                bg: themes.color6,
                            }),
                            indicatorSeparator: (provided) => ({
                                ...provided,
                                display: 'none',
                            }),
                        }}
                    />
                )}
                <FormErrorMessage>{error?.message}</FormErrorMessage>
            </FormControl>
        </>
    );
};

export default SelectAddress;
