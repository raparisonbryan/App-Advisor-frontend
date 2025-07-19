import styles from './Button.module.scss';
import React from "react";
import {Button} from "@radix-ui/themes";

export interface SecondaryButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    className?: string;
}

const SecondaryBtn = (props: SecondaryButtonProps) => {
    return (
        <Button type="button" className={`${styles.secondaryBtn} ${props.className}`} onClick={props.onClick}>{props.children}</Button>
    )
}

export default SecondaryBtn;