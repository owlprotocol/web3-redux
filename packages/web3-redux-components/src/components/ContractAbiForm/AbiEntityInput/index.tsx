import InputField from '../../InputField';

export interface Props {
    type: string;
    name: string | undefined;
    errMsg?: string;
    onChange?: (value: string) => void;
}

const AbiEntityInput = ({ type, name, onChange, errMsg }: Props) => {
    const placeholder = `${name} (${type})`;

    return (
        <div data-type={type} data-name={name}>
            <InputField
                placeholder={placeholder}
                errMsg={errMsg}
                // @ts-ignore
                onChange={({ target }: any) => onChange(target.value)}
            />
            <br />
        </div>
    );
};

export default AbiEntityInput;
