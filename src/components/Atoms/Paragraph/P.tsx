import {ReactNode} from "react";

export interface PProps {
    children: ReactNode;
}

const P = (props: PProps) => {
    return (
        <p>
            {props.children}
        </p>
    )
}

export default P;