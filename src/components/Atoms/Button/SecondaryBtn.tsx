import styles from './Button.module.scss';
import React from "react";

export interface SecondaryButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
}

const SecondaryBtn = (props: SecondaryButtonProps) => {
    return (
        <button type="button" className={styles.secondaryBtn} onClick={props.onClick}>{props.children}</button>
    )
}

export default SecondaryBtn;