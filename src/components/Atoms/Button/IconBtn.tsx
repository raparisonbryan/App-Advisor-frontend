import React from "react";
import {IconButton} from "@radix-ui/themes";

export interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    ariaLabel?: string;
    title?: string;
}

const Btn = (props: ButtonProps) => {
    return (
        <IconButton 
            id="icon_btn" 
            className="icon" 
            onClick={props.onClick}
            aria-label={props.ariaLabel}
            title={props.title}
        >
            {props.children}
        </IconButton>
    )
}

export default Btn;