import React from "react";
import {IconButton} from "@radix-ui/themes";

export interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
}

const Btn = (props: ButtonProps) => {
    return (
        <IconButton id="icon_btn" className="icon" onClick={props.onClick}>{props.children}</IconButton>
    )
}

export default Btn;