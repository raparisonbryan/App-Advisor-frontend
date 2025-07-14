import styles from "./Input.module.scss";
import { ChangeEvent } from 'react';
import {TextArea} from "@radix-ui/themes";

interface TextAreaProps {
  message: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const InputArea = (props: TextAreaProps) => {
  const { message, placeholder, onChange } = props;

  return (
    <TextArea
      className={styles.message}
      name={message}
      id={message}
      value={message}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default InputArea;