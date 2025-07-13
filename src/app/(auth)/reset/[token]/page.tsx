"use client"

import styles from "@/app/(auth)/page.module.scss";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import LoginCard from "@/components/Atoms/Card/LoginCard";
import H2 from "@/components/Atoms/Title/H2/H2";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import InputButton from "@/components/Atoms/Input/InputButton";
import Img from "@/components/Atoms/Img/Img";
import bg from "@/assets/Hero.webp";
import {FormEvent, useState} from "react";
import InputPassword from "@/components/Atoms/Input/InputPassword";
import {useParams, useRouter} from "next/navigation";
import Btn from "@/components/Atoms/Button/Btn";
import Link from "next/link";
import {ArrowLeftIcon} from "@radix-ui/react-icons";

const Reset = () => {
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isPwdReset, setIsPwdReset] = useState(false);
    const params = useParams();
    const token = params.token as string;
    const router = useRouter();

    const handleReset = async (event: FormEvent) => {
        event.preventDefault();
        setErrorMsg('');

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/reset-password/' + token, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMsg(errorData.msg);
                return;
            }

            setIsPwdReset(true);

        } catch (error: any) {
            console.error("Erreur lors de l'envoi du mail", error);
            const message = error.message;
            setErrorMsg(message);
        }
    };

    const handleGoHome = () => {
        router.push('/');
    };

    const handleNoSubmit = (event: FormEvent) => {
        event.preventDefault();
    };

    return (
        <main className={styles.main}>
            <Link href={'/reinitialisation'} className={styles.header}>
                <ArrowLeftIcon width="30px" height="30px" />
            </Link>
            <Wrapper alignItems="center" justifyContent="center" height="100%" width="50%">
                <LoginCard onSubmit={isPwdReset ? handleNoSubmit : handleReset}>
                    {isPwdReset ? (
                        <>
                            <H2>Mot de passe réinitialisé !</H2>
                            <p>Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.</p>
                            <Btn onClick={handleGoHome}>Accueil</Btn>
                        </>
                    ) : (
                        <>
                            <H2>Réinitialisez votre mot de passe</H2>
                            {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
                            <WrapperRow gap="10px" width="100%">
                                <InputPassword
                                    placeholder="Mot de passe"
                                    value={password} onChange={(e) => setPassword(e.target.value)}
                                />
                            </WrapperRow>
                            <InputButton text="Réinitialiser le mot de passe" />
                        </>
                    )}
                </LoginCard>
            </Wrapper>
            <Wrapper width="50%" height="100%">
                <Img src={bg} height="100%" width="100%" objectFit="cover"/>
            </Wrapper>
        </main>
    )
}

export  default Reset;