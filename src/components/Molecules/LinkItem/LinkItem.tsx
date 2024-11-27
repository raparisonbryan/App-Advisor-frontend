import Link from 'next/link';
import styles from './LinkItem.module.scss';
import { ReactNode } from 'react';

interface LinkItemProps {
  href: string;
  children: ReactNode;
}

const LinkItem = (props: LinkItemProps) => {
  const { href, children } = props;

  return (
    <li className={styles.linkItem}>
      <Link href={href} className={styles.link}>
        {children}
      </Link>
    </li>
  );
}

export default LinkItem;