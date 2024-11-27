import { ReactNode } from "react";
import styles from "./Img.module.scss";

interface OutilImgProps {
  children: ReactNode;
}

const OutilImg = (props: OutilImgProps) => {
  return (
    <div className={styles.logo_background}>
      <div className={styles.logo_border}>
        <div className={styles.logo}>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default OutilImg;