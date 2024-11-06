'use client'

import styles from "./page.module.scss";
import InputText from "@/components/Atoms/Input/InputText";
import SecondaryBtn from "@/components/Atoms/Button/SecondaryBtn";
import Mask from "@/components/Atoms/Mask/Mask";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import H2 from "@/components/Atoms/Title/H2/H2";
import LoginCard from "@/components/Atoms/Card/LoginCard";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import InputButton from "@/components/Atoms/Input/InputButton";
import Cookies from 'js-cookie';
import { useAuth } from "@/context/AuthContext";

const Connexion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(''); 
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMsg('');

    try {
      const response = await axios.post('http://localhost:3000/user/signin', {
        email,
        password,
      });
      Cookies.set('token', response.data.token, { expires: 7 });
      setUser({ id: response.data.userId });
      router.push('/');
    } catch (error) {
      console.error("Erreur complète: ", error);
      console.error("Erreur de connexion", error.response);
      const message = error.response && error.response.data ? error.response.data.msg : "Une erreur est survenue";
      setErrorMsg(message);
    }
  };

  return (
    <main className={styles.main}>
      <Mask backgroundColor="rgba(0, 0, 0, 0.3)" backdropFilter="blur(20px)" />
      <Wrapper alignItems="center" justifyContent="center" height="100%" zIndex="20">
          <LoginCard onSubmit={handleLogin}>
            <H2>Connexion</H2>
            <InputText type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <InputText type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
            {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}
            <WrapperRow justifyContent="space-between" width="100%" gap="10px">
              <InputButton text="Se connecter" />
              <SecondaryBtn text="S'inscrire" link="/Inscription" />
            </WrapperRow>
          </LoginCard>
      </Wrapper>
    </main>
  );
}

export default Connexion;