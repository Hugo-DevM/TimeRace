import styles from "../styles/components/Button.module.css"

function Button(props) {

    const buttonStyle = {
        backgroundColor: '#007BFF'
    };


    if (props?.variant === "warning") buttonStyle.backgroundColor = "#c51313c7"
    if (props?.variant === "success") buttonStyle.backgroundColor = "#2ecc71"


    return (
        <button className={styles.buttonStyle} type={props.type} onClick={props?.onClick} style={buttonStyle}>
            {props.children}
        </button>
    );
}

export default Button;