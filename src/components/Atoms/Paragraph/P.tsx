import {ReactNode} from "react";

export interface PProps {
    children: ReactNode;
    className?: string;
}

const P = (props: PProps) => {
    return (
        <p className={props.className}>
            {props.children}
        </p>
    )
}

export default P;