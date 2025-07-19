"use client"

import styles from "@/app/(auth)/page.module.scss";
import Link from "next/link";
import {ArrowLeftIcon} from "@radix-ui/react-icons";
import LoginCard from "@/components/Atoms/Card/LoginCard";
import H2 from "@/components/Atoms/Title/H2/H2";
import InputButton from "@/components/Atoms/Input/InputButton";
import Img from "@/components/Atoms/Img/Img";
import bg from "@/assets/Hero.webp";
import {FormEvent, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {resetPassword} from "@/services/AuthService";
import Btn from "@/components/Atoms/Button/Btn";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import {Flex} from "@radix-ui/themes";
import InputPassword from "@/components/Atoms/Input/InputPassword";

const ResetTemplate = () => {
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isPwdReset, setIsPwdReset] = useState(false);
    const params = useParams();
    const token = params.token as string;
    const router = useRouter();

    const mutation = useMutation({
        mutationFn: resetPassword,
        onSuccess: () => {
            setIsPwdReset(true);
        },
        onError: (error: any) => {
            setErrorMsg(error.message);
        },
    });

    const handleReset = (event: FormEvent) => {
        event.preventDefault();
        setErrorMsg('');
        mutation.mutate({ token, password });
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
            <Flex className={styles.form_wrapper} align="center" justify="center" height="100%">
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
                            <InputButton text={mutation.isPending ? "Réinitialisation..." : "Réinitialiser le mot de passe"} disabled={mutation.isPending} />
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

export default ResetTemplate;