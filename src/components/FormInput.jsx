import styles from "../styles/components/FormInput.module.css";

function FormInput({ type, value, onChange, placeholder, autoComplete, readOnly }) {
    return (
        <>
            <input
                className={styles.inputText}
                type={type}
                value={value ?? ""}
                onChange={(e) => onChange?.(e.target.value)}
                placeholder={placeholder}
                autoComplete={autoComplete ?? "off"}
                readOnly={readOnly}
            />
            <br />
        </>
    );
}

export default FormInput;
