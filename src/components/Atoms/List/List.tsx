import styles from './List.module.scss';
import { ReactNode } from 'react';

interface ListProps {
  children: ReactNode;
}

const List = (props: ListProps) => {
  const { children } = props;

  return (
      <ul className={styles.list}>
        {children}
      </ul>
  );
}
export default List;
