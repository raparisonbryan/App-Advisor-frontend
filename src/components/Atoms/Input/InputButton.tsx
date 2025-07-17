import styles from './Input.module.scss';
import {Button} from "@radix-ui/themes";

interface InputButtonProps {
  text: string;
  disabled?: boolean;
}

const InputButton = ({ text, disabled }: InputButtonProps) => {
  return (
      <Button type="submit" className={styles.button} disabled={disabled}>{text}</Button>
  );
}

export default InputButton;