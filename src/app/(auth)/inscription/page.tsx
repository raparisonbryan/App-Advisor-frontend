'use client'

import styles from "../page.module.scss";
import InputText from "@/components/Atoms/Input/InputText";
import bg from "@/assets/Hero.webp";
import H2 from "@/components/Atoms/Title/H2/H2";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import LoginCard from "@/components/Atoms/Card/LoginCard";
import InputButton from "@/components/Atoms/Input/InputButton";
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Img from "@/components/Atoms/Img/Img";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import InputPassword from "@/components/Atoms/Input/InputPassword";
import P from "@/components/Atoms/Paragraph/P";
import Link from "next/link";
import {LeftCircleOutlined} from "@ant-design/icons";

const Inscription = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMsg('');

    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user/signup', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            setErrorMsg(errorData.msg);
            return;
        }

        router.push('/connexion');
        alert('Inscription réussie');

        } catch (error: any) {
            console.error("Erreur d'inscription", error);
            const message = error.message;
            setErrorMsg(message);
        }
    };

  return (
    <main className={styles.main}>
        <Link href={'/connexion'} className={styles.header}>
            <LeftCircleOutlined />
        </Link>
        <Wrapper alignItems="center" justifyContent="center" height="100%" width="50%">
            <LoginCard onSubmit={handleSignUp}>
                <H2>Inscription</H2>
                <WrapperRow gap="10px" width="100%">
                    <InputText
                        type="text"
                        placeholder="Nom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <InputText
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </WrapperRow>
                <Wrapper gap="5px" width="100%">
                    <InputPassword
                        placeholder="Mot de passe"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                    <P className={styles.requirement}>Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial</P>
                </Wrapper>
                {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
                <InputButton text="S'inscrire" />
            </LoginCard>
        </Wrapper>
        <Wrapper width="50%" height="100%">
            <Img src={bg} height="100%" width="100%" objectFit="cover"/>
        </Wrapper>
    </main>
  );
}

export default Inscription;