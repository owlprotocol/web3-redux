import InputField from '../../InputField';

export interface Props {
    type: string;
    name: string;
    onChange?: any;
    errMsg?: string;
}

const AbiEntityInput = ({ type, name, onChange, errMsg }: Props) => {
    const placeholder = `${name} (${type})`;

    return (
        <div data-type={type} data-name={name}>
            <InputField
                placeholder={placeholder}
                errMsg={errMsg}
                // @ts-ignore
                onChange={({ target }: any) => onChange(name, target.value, type)}
            />
            <br />
        </div>
    );
};

export default AbiEntityInput;
