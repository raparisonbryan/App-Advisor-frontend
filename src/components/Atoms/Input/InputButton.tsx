import styles from './Input.module.scss';
import {Button} from "@radix-ui/themes";

interface InputButtonProps {
  text: string;
}

const InputButton = ({ text }: InputButtonProps) => {
  return (
      <Button type="submit" className={styles.button}>{text}</Button>
  );
}

export default InputButton;