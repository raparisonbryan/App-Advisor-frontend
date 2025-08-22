import React, { forwardRef } from 'react';
import styles from './Input.module.scss';

interface InputSearchProps {
  type: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
}

const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>((props, ref) => {
  const { type, placeholder, value, onChange, onFocus } = props;

  return (
    <input 
      ref={ref}
      className={styles.search} 
      type={type} 
      placeholder={placeholder} 
      value={value} 
      onChange={onChange}
      onFocus={onFocus}
    />
  );
});

InputSearch.displayName = 'InputSearch';

export default InputSearch;