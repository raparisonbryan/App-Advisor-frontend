'use client';

import * as Toast from '@radix-ui/react-toast';
import { Cross2Icon, CheckCircledIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons';
import styles from './Toast.module.scss';

interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
}

const ToastComponent = ({ 
  open, 
  onOpenChange, 
  title, 
  description, 
  type = 'info',
  duration = 5000 
}: ToastProps) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircledIcon className={styles.icon} />;
      case 'error':
        return <ExclamationTriangleIcon className={styles.icon} />;
      default:
        return null;
    }
  };

  return (
    <Toast.Provider duration={duration}>
      <Toast.Root 
        className={`${styles.toast} ${styles[type]}`}
        open={open} 
        onOpenChange={onOpenChange}
      >
        <div className={styles.content}>
          {getIcon()}
          <div className={styles.text}>
            <Toast.Title className={styles.title}>{title}</Toast.Title>
            {description && (
              <Toast.Description className={styles.description}>
                {description}
              </Toast.Description>
            )}
          </div>
        </div>
        <Toast.Close className={styles.close}>
          <Cross2Icon />
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport className={styles.viewport} />
    </Toast.Provider>
  );
};

export default ToastComponent;
