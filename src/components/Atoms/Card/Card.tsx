import styles from "./Card.module.scss";
import {ReactNode} from "react";

export interface CardProps {
    children: ReactNode;
}

const Card = (props: CardProps)=> {
    return (
        <div className={styles.card}>
            {props.children}
        </div>
    )
}

export default Card;