import styles from './Input.module.scss';

interface InputButtonProps {
  text: string;
}

const InputButton = ({ text }: InputButtonProps) => {
  return (
    <input type="submit" className={styles.button} value={text} />
  );
}

export default InputButton;