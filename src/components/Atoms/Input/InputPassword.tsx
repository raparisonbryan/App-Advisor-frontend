import {ChangeEvent, useState} from "react";
import styles from "./Input.module.scss";
import EyeIcon from "next/dist/client/components/react-dev-overlay/ui/icons/eye-icon";
import {EyeNoneIcon} from "@radix-ui/react-icons";

interface InputPasswordProps {
    name?: string;
    placeholder?: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputPassword = (props: InputPasswordProps) => {
    const { name, placeholder, value, onChange } = props;
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    return (
        <div className={styles.passwordContainer}>
            <input
                className={styles.input}
                type={isVisible ? "text" : "password"}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            <button
                type="button"
                className={styles.toggleButton}
                onClick={toggleVisibility}
                aria-label={isVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
                {isVisible ? <EyeNoneIcon /> : <EyeIcon />}
            </button>
        </div>
    );
}

export default InputPassword;