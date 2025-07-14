import styles from './Button.module.scss';
import React from "react";
import {Button} from "@radix-ui/themes";

export interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const ModalBtn = (props: ButtonProps) => {
    return (
        <Button disabled={props.disabled} type={props.type} className={styles.modalBtn} onClick={props.onClick}>{props.children}</Button>
    )
}

export default ModalBtn;