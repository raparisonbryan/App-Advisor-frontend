import styles from "./SearchBar.module.scss";
import Btn from "@/components/Atoms/Button/Btn";
import InputSearch from "@/components/Atoms/Input/InputSearch";
import {useRouter} from "next/navigation";

const SearchBar = () => {
    const router = useRouter();

    return (
        <form className={styles.form}>
          <InputSearch type="text" placeholder="Recherchez votre framework, outil, ..."/>
            <Btn onClick={() => router.push("/")}>rechercher</Btn>
        </form>
    )
}

export default SearchBar;