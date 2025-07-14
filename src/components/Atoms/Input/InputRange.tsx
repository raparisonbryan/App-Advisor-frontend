import styles from './Input.module.scss';
import { ChangeEvent } from 'react';

interface InputRangeProps {
  label: string;
  id: string;
  value: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputRange = (props: InputRangeProps) => {
  const { label, id, value, onChange } = props;

  return (
    <>
      <div className={styles.label_wrapper}>
        <label className={styles.label} htmlFor={id}>{label}</label>
        <span className={styles.label}>{value}/20</span>
      </div>
      <input
        className={styles.range}
        type="range"
        id={id}
        name={id}
        min="0"
        max="20"
        step="1"
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default InputRange;