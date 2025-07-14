import React from "react";
import {Button} from "@radix-ui/themes";

export interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}

const Btn = (props: ButtonProps) => {
    return (
            <Button id="primary_button" type={props.type} className="button" onClick={props.onClick}>{props.children}</Button>
    )
}

export default Btn;