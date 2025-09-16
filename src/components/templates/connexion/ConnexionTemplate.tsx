'use client'

import styles from "@/app/(auth)/page.module.scss";
import InputText from "@/components/Atoms/Input/InputText";
import SecondaryBtn from "@/components/Atoms/Button/SecondaryBtn";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import H2 from "@/components/Atoms/Title/H2/H2";
import LoginCard from "@/components/Atoms/Card/LoginCard";
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import InputButton from "@/components/Atoms/Input/InputButton";
import { useAuth } from "@/context/AuthContext";
import Img from "@/components/Atoms/Img/Img";
import bg from "@/assets/Hero.webp";
import Link from "next/link";
import InputPassword from "@/components/Atoms/Input/InputPassword";
import {ArrowLeftIcon} from "@radix-ui/react-icons";
import {Flex} from "@radix-ui/themes";

const ConnexionTemplate = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string>('');
    const router = useRouter();

    const { login, isLoading } = useAuth();

    const handleLogin = async (event: FormEvent) => {
        event.preventDefault();
        setErrorMsg('');

        try {
            await login({ email, password });
            router.push('/');
        } catch (error: unknown) {
            setErrorMsg(error instanceof Error ? error.message : 'Une erreur est survenue lors de la connexion');
        }
    }

    return (
        <main className={styles.main}>
            <Link href={'/'} className={styles.header}>
                <ArrowLeftIcon width="30px" height="30px" />
            </Link>
            <Flex className={styles.form_wrapper} align="center" justify="center" height="100%">
                <LoginCard onSubmit={handleLogin}>
                    <H2>Connexion</H2>
                    <InputText
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                    <Wrapper width="100%" gap="5px">
                        <InputPassword
                            placeholder="Mot de passe"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                        <Link className={styles.link} href={'/reinitialisation'}>Mot de passe oublié ?</Link>
                    </Wrapper>
                    {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
                    <Flex className={styles.btn_wrapper}>
                        <InputButton text={isLoading ? "Connexion en cours..." : "Se connecter"} />
                        <SecondaryBtn onClick={() => router.push("/inscription")}>
                            Inscription
                        </SecondaryBtn>
                    </Flex>
                </LoginCard>
            </Flex>
            <Flex className={styles.img_wrapper} height="100%">
                <Img src={bg} height="100%" width="100%" objectFit="cover"/>
            </Flex>
        </main>

    );
}

export default ConnexionTemplate;