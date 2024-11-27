import {ReactNode} from "react";

interface H3Props {
    children: ReactNode;
    color?: string;
}

const H3 = (props: H3Props) => {
    const { children, color } = props;

    return <h3 style={{ color: color }}>{children}</h3>;
}

export default H3;