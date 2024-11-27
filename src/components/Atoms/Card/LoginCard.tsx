import styles from "./Card.module.scss";
import {FormEvent, ReactNode} from "react";

export interface LoginCardProps {
    children: ReactNode;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const LoginCard = (props: LoginCardProps) => {
    return (
        <form className={styles.login} onSubmit={props.onSubmit}>
            {props.children}
        </form>
    );
}

export default LoginCard;