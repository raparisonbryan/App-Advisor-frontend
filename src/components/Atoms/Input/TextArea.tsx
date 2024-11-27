import styles from "./Input.module.scss";
import { ChangeEvent } from 'react';

interface TextAreaProps {
  message: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea = (props: TextAreaProps) => {
  const { message, placeholder, onChange } = props;

  return (
    <textarea
      className={styles.message}
      name={message}
      id={message}
      value={message}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default TextArea;