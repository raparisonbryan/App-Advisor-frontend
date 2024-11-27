import styles from "./Mask.module.scss";

interface MaskProps {
  backgroundColor?: string;
  backdropFilter?: string;
}

const Mask = (props: MaskProps) => {
  const { backgroundColor, backdropFilter } = props;

  return (
    <div className={styles.mask} style={{
      backgroundColor: backgroundColor,
      backdropFilter: backdropFilter
    }}/>
  );
}

export default Mask;