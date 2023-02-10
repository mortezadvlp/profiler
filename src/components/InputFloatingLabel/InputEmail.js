import InputFloatingLabel from "./InputFloatingLabel";


export default function InputEmail(
    { className = '', label = 'Email Address', value = '', onChangeValue = () => {} }) {


    return (
        <InputFloatingLabel className={className} lineCount='1' label={label} type='email'
            value={value} onChangeValue={(val) => onChangeValue(val)} />
    );
}
