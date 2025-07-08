"use client"

import styles from "@/app/(auth)/page.module.scss";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import LoginCard from "@/components/Atoms/Card/LoginCard";
import H2 from "@/components/Atoms/Title/H2/H2";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import InputText from "@/components/Atoms/Input/InputText";
import InputButton from "@/components/Atoms/Input/InputButton";
import Img from "@/components/Atoms/Img/Img";
import bg from "@/assets/Hero.webp";
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import Button from "@/components/Atoms/Button/Button";
import {LeftCircleOutlined} from "@ant-design/icons";
import Link from "next/link";

const Reinitialisation = () => {
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const router = useRouter();

    const handleForgot = async (event: FormEvent) => {
        event.preventDefault();
        setErrorMsg('');

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMsg(errorData.msg);
                return;
            }

            setIsEmailSent(true);

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
            <Link href={'/connexion'} className={styles.header}>
                <LeftCircleOutlined />
            </Link>
            <Wrapper alignItems="center" justifyContent="center" height="100%" width="50%">
                <LoginCard onSubmit={isEmailSent ? handleNoSubmit : handleForgot}>
                    {isEmailSent ? (
                        <>
                            <H2>Email envoyé !</H2>
                            <p>Un email de réinitialisation a été envoyé à votre adresse email.</p>
                            <Button onClick={handleGoHome}>Accueil</Button>
                        </>
                    ) : (
                        <>
                            <H2>Réinitialisez votre mot de passe</H2>
                            {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
                            <WrapperRow gap="10px" width="100%">
                                <InputText
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </WrapperRow>
                            <InputButton text="Envoyer le mail" />
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

export default Reinitialisation;