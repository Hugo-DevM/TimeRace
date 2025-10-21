import styles from "../styles/components/FormInput.module.css";

function FormInput({ type, value, onChange, placeholder, autoComplete, title, readOnly }) {
    return (
        <>
            {title && <span className={styles.subTitle}>{title}</span>}
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
