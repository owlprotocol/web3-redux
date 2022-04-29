import _ from 'lodash';
import Web3 from 'web3';

interface ValidateProps {
    formValues: [];
    setError: any;
    errors: any;
}
interface ContractEntityProps {
    type: any;
    value: any;
}
const validate = ({ formValues, setError, errors }: ValidateProps) => {
    _.each(formValues, (contractEntity: ContractEntityProps, name) => {
        switch (contractEntity.type) {
            case 'address': {
                // Might be redundat since 'toChecksumAddress' does address validation.
                // Consider remove.
                const isAddress = Web3.utils.isAddress(contractEntity.value as string);

                if (!isAddress) {
                    setError({
                        ...errors,
                        [name]: 'Not a valid Address',
                    });
                }
                break;
            }

            case 'uint8':
            case 'uint256': {
                const isNumber = /^\d+$/.test(contractEntity.value);

                if (!isNumber) {
                    setError({
                        ...errors,
                        [name]: 'Not a valid Number',
                    });
                }
                break;
            }

            case 'byte': {
                const isValidHex = Web3.utils.isHexStrict(contractEntity.value);

                if (!isValidHex) {
                    setError({
                        ...errors,
                        [name]: 'Not a valid Hex / Byte',
                    });
                }
                break;
            }

            default:
                break;
        }
    });

    if (_.isEmpty(errors)) return true;
    return false;
};

interface WriteToContractProps {
    functionName: string;
    resetForm: any;
    formValues: [];
    setError: any;
    errors: any;
}
export const writeToContract = ({ functionName, resetForm, formValues, setError, errors }: WriteToContractProps) => {
    resetForm();

    if (validate({ formValues, setError, errors })) {
        console.log('Run => ', functionName, formValues);
    } else {
        alert('check error msgs');
    }
};
