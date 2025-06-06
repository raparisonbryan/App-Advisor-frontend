import styles from "./Loading.module.scss";
import P from "@/components/Atoms/Paragraph/P";

const Loading = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.spinner}></div>
            <P>Chargement...</P>
        </div>
    )
}

export default Loading;