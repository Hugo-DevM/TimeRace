import { useState } from "react";
import styles from "../styles/components/FormInput.module.css"

function FormInput(props) {
    const [inputType] = useState(props.type);
    const [inputValue, setInputValue] = useState('');

    function handleChange(event) {
        const newValue = event.target.value
        setInputValue(newValue);
        if (props.onChange) props.onChange(newValue);
    };

    return (
        <>
            <span className={styles.subTitle}>{props?.title ? props.title : ""}</span>
            <input
                className={styles.inputText}
                type={inputType}
                value={inputValue}
                name="input-form"
                onChange={handleChange}
                placeholder={props?.placeholder}
                autoComplete={props?.autocomplete ? props.autocomplete : "off"} />
            <br />
        </>
    );
};

export default FormInput;