import {ReactNode} from "react";

interface H2Props {
    children: ReactNode;
    color?: string;
}

const H2 = (props: H2Props) => {
    const { children, color } = props;

    return <h2 style={{ color: color }}>{children}</h2>;
}

export default H2;