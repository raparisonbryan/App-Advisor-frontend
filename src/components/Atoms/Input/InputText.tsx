import styles from './Input.module.scss';
import { ChangeEvent } from 'react';

interface InputTextProps {
  type: string;
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputText = (props: InputTextProps) => {
  const { type, name, placeholder, value, onChange } = props;

  return (
    <input
      className={styles.input}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default InputText;