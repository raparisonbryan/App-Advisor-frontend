import styles from './Button.module.scss';
import React from "react";

export interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
}

const Button = (props: ButtonProps) => {
    return (
        <button className={styles.button} onClick={props.onClick}>{props.children}</button>
    )
}

export default Button;