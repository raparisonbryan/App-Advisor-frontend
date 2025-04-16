'use client'

import styles from "./ConnexionTemplate.module.scss";
import InputText from "@/components/Atoms/Input/InputText";
import SecondaryBtn from "@/components/Atoms/Button/SecondaryBtn";
import Mask from "@/components/Atoms/Mask/Mask";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import H2 from "@/components/Atoms/Title/H2/H2";
import LoginCard from "@/components/Atoms/Card/LoginCard";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import InputButton from "@/components/Atoms/Input/InputButton";
import { useAuth } from "@/context/AuthContext";

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
        } catch (error: any) {
            console.error("Erreur de connexion: ", error);
            setErrorMsg(error.message || 'Une erreur est survenue lors de la connexion');
        }
    }

    return (
        <main className={styles.main}>
            <Mask backgroundColor="rgba(0, 0, 0, 0.3)" backdropFilter="blur(20px)" />
            <Wrapper alignItems="center" justifyContent="center" height="100%" zIndex="20">
                <LoginCard onSubmit={handleLogin}>
                    <H2>Connexion</H2>
                    <InputText
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    />
                    <InputText
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />
                    {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
                    <WrapperRow justifyContent="space-between" width="100%" gap="10px">
                        <InputButton text={isLoading ? "Connexion en cours..." : "Se connecter"} />
                        <SecondaryBtn onClick={() => router.push("/inscription")}>
                            Inscription
                        </SecondaryBtn>
                    </WrapperRow>
                </LoginCard>
            </Wrapper>
        </main>
    );
}

export default ConnexionTemplate;