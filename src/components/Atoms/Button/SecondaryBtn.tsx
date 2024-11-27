import Link from 'next/link';
import styles from './Button.module.scss';

export interface SecondaryButtonProps {
    text: string;
    onClick?: () => void;
    link: string;
}

const SecondaryBtn = (props: SecondaryButtonProps) => {
    return (
        <Link href={props.link}>
            <button className={styles.secondaryBtn} onClick={props.onClick}>{props.text}</button>
        </Link>
    )
}

export default SecondaryBtn;