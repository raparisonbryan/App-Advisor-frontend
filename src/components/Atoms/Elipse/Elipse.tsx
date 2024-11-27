import styles from "./Elipse.module.scss";
import {ReactNode} from "react";

export interface ElipseProps {
    children: ReactNode;
}

const Elipse = (props: ElipseProps) => {
    return (
        <p className={styles.elipse}>{props.children}</p>
    )
}

export default Elipse;