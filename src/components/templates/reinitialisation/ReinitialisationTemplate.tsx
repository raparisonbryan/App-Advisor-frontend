"use client"

import styles from "@/app/(auth)/page.module.scss";
import Link from "next/link";
import {ArrowLeftIcon} from "@radix-ui/react-icons";
import LoginCard from "@/components/Atoms/Card/LoginCard";
import H2 from "@/components/Atoms/Title/H2/H2";
import InputText from "@/components/Atoms/Input/InputText";
import InputButton from "@/components/Atoms/Input/InputButton";
import Img from "@/components/Atoms/Img/Img";
import bg from "@/assets/Hero.webp";
import {FormEvent, useState} from "react";
import {useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {forgotPassword} from "@/services/AuthService";
import Btn from "@/components/Atoms/Button/Btn";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import {Flex} from "@radix-ui/themes";

const ReinitialisationTemplate = () => {
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isEmailSent, setIsEmailSent] = useState(false);
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: forgotPassword,
        onSuccess: () => {
            setIsEmailSent(true);
        },
        onError: (error: Error) => {
            setErrorMsg(error.message);
        },
    });

    const handleForgot = (event: FormEvent) => {
        event.preventDefault();
        setErrorMsg('');

        if (!email.trim()) {
            setErrorMsg('Veuillez saisir une adresse email');
            return;
        }

        mutation.mutate(email);
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
                <ArrowLeftIcon width="30px" height="30px" />
            </Link>
            <Flex className={styles.form_wrapper} align="center" justify="center" height="100%">
                <LoginCard onSubmit={isEmailSent ? handleNoSubmit : handleForgot}>
                    {isEmailSent ? (
                        <>
                            <H2>Email envoyé !</H2>
                            <p>Un email de réinitialisation a été envoyé à votre adresse email.</p>
                            <Btn onClick={handleGoHome}>Accueil</Btn>
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
                            <InputButton
                                text={mutation.isPending ? "Envoi en cours..." : "Envoyer le mail"}
                                disabled={mutation.isPending || !email.trim()}
                            />
                        </>
                    )}
                </LoginCard>
            </Flex>
            <Flex className={styles.img_wrapper} height="100%">
                <Img src={bg} height="100%" width="100%" objectFit="cover"/>
            </Flex>
        </main>
    )
}

export default ReinitialisationTemplate;