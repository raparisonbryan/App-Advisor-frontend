import Link from 'next/link';
import styles from './Button.module.scss';

export interface ButtonProps {
    text: string;
    onClick?: () => void;
    link: string;
}

const Button = (props: ButtonProps) => {
    return (
        <Link href={props.link}>
            <button className={styles.button} onClick={props.onClick}>{props.text}</button>
        </Link>
    )
}

export default Button;