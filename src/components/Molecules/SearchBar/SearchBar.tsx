import styles from "./SearchBar.module.scss";
import Button from "@/components/Atoms/Button/Button";
import InputSearch from "@/components/Atoms/Input/InputSearch";
import {useRouter} from "next/navigation";

const SearchBar = () => {
    const router = useRouter();

    return (
        <form className={styles.form}>
          <InputSearch type="text" placeholder="Recherchez votre framework, outil, ..."/>
            <Button onClick={() => router.push("/")}>rechercher</Button>
        </form>
    )
}

export default SearchBar;