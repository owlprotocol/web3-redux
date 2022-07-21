import { useCallback, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import AbiItemInput from '../AbiItemInput/index.js';
import { useArray } from '../../../hooks/index.js';

//TODO
//Formik integration
//https://chakra-ui.com/docs/components/form/form-control#usage-with-form-libraries
//Better error handling for reverts

//Similar to AbiItem interface
export interface Props {
    inputs: {
        name: string | undefined;
        type: string;
    }[];
    onChange?: (args: (string | boolean | undefined)[], errors: (Error | undefined)[], valid: boolean) => void;
}

export const AbiItemForm = ({
    inputs = [],
    onChange = (args, errors, valid) => console.log({ args, errors, valid }),
}: Props) => {
    //Errors caused by user input
    const [errors, setErrorAtIdx, setErrors] = useArray(inputs.length);
    const [args, setArgAtIdx, setArgs] = useArray(inputs.length);

    useEffect(() => {
        //Reset state
        setErrors(Array(inputs.length));
        setArgs(Array(inputs.length));
    }, [inputs, setArgs, setErrors]);

    useEffect(() => {
        const argsDefined = args.length > 0 ? args.reduce((acc, curr) => acc && !!curr, !!args[0]) : true;
        const noInputErrors = errors.length > 0 ? errors.reduce((acc, curr) => acc && !curr, !errors[0]) : true;
        const valid = argsDefined && noInputErrors;

        onChange(args, errors, valid);
    }, [args, errors, onChange]);

    const onChangeInput = useCallback(
        (value: string | boolean | undefined, error: Error | undefined, idx: number) => {
            setErrorAtIdx(error, idx);
            setArgAtIdx(value, idx);
        },
        [setErrorAtIdx, setArgAtIdx],
    );

    //Ideas for memoization?
    //https://stackoverflow.com/questions/55006061/react-hooks-usecallback-with-parameters-inside-loop
    return (
        <>
            {inputs.map(({ name, type }: any, key: number) => {
                return (
                    <Box mb={3} key={key}>
                        <AbiItemInput
                            type={type}
                            name={name}
                            onChange={(value, error) => {
                                onChangeInput(value, error, key);
                            }}
                        />
                    </Box>
                );
            })}
        </>
    );
};

export default AbiItemForm;
