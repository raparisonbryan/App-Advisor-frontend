'use client'

import styles from "./page.module.scss";
import InputText from "@/components/Atoms/Input/InputText";
import Mask from "@/components/Atoms/Mask/Mask";
import H2 from "@/components/Atoms/Title/H2/H2";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import LoginCard from "@/components/Atoms/Card/LoginCard";
import InputButton from "@/components/Atoms/Input/InputButton";
import axios from 'axios';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

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
      const response = await axios.post('http://localhost:3000/user/signup', {
        name,
        email,
        password,
      });
      console.log(response.data);
      router.push('/Connexion');
      alert('Inscription réussie');
    } catch (error: any) {
      console.error("Erreur d'inscription", error.response);
      const message = error.response && error.response.data ? error.response.data.msg : "Une erreur est survenue lors de l'inscription";
      setErrorMsg(message);
    }
  };

  return (
    <main className={styles.main}>
        <Mask backgroundColor="rgba(0, 0, 0, 0.3)" backdropFilter="blur(20px)"/>
        <Wrapper alignItems="center" justifyContent="center" height="100%" zIndex="20">
            <LoginCard onSubmit={handleSignUp}>
                <H2>Inscription</H2>
                {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
                <InputText type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)}/>
                <InputText type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <InputText type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <InputButton text="S'inscrire" />
            </LoginCard>
        </Wrapper>
    </main>
  );
}

export default Inscription;