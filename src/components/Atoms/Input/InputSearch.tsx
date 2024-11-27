import styles from './Input.module.scss';

interface InputSearchProps {
  type: string;
  placeholder: string;
  value?: string;
}

const InputSearch = (props: InputSearchProps) => {
  const { type, placeholder, value } = props;

  return (
    <input className={styles.search} type={type} placeholder={placeholder} value={value} />
  );
}

export default InputSearch;