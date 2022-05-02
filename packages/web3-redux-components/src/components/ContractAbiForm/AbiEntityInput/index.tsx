import InputField from '../../InputField';

interface Props {
    type: string;
    placeholder: string;
    onChange: () => any;
}

const AbiEntityInput = ({ type, placeholder, onChange }: Props) => {
    return (
        <div data-type={type}>
            <InputField placeholder={placeholder} hasError={false} onChange={onChange} />
            <br />
        </div>
    );
};

export default AbiEntityInput;
