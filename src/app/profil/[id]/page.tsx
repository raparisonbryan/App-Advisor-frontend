'use client'

import styles from "./page.module.scss";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Container from '@/components/Atoms/Container/Container';
import Wrapper from '@/components/Atoms/Wrapper/Wrapper';
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import H2 from '@/components/Atoms/Title/H2/H2';
import InputButton from '@/components/Atoms/Input/InputButton';
import InputText from "@/components/Atoms/Input/InputText";
import SecondaryBtn from "@/components/Atoms/Button/SecondaryBtn";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types/User";
import {useParams, useRouter} from "next/navigation";

const Profil = () => {
  const params = useParams<{ id: string }>();
  const [userProfil, setUserProfil] = useState<User>({ name: '', email: '' });
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const loadProfil = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${params.id}`);
        const data = await response.json();
        setUserProfil(data);
      } catch (erreur) {
        console.error("Erreur lors de la récupération de l'utilisateur:", erreur);
      }
    };

    loadProfil();
  }, [params.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfil((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfil),
      });

      if (!response.ok) {
        new Error('Une erreur est survenue lors de la mise à jour du profil');
      }

      alert('profil mis à jour avec succès!');
    } catch (erreur) {
      console.error("Erreur lors de la mise à jour de l'utilisateur:", erreur);
    }
  };

  const handleLogout = async () => {
    Cookies.remove('token');
    await logout();
    router.push('/connexion');
  };

  return (
    <main>
      <Container justifyContent="center" alignItems="center" paddingTop="100px" height="100vh">
        <div className={styles.form_wrapper}>
          <H2>Profil</H2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <WrapperRow justifyContent="center" width="100%" gap="20px">
              <Wrapper alignItems="center" width="70%" gap="20px">
                <Wrapper width="100%" gap="10px">
                  <InputText type="text" name="name" value={userProfil.name} onChange={handleChange} />
                </Wrapper>
                <Wrapper width="100%" gap="10px">
                  <InputText type="email" name="email" value={userProfil.email} onChange={handleChange} />
                </Wrapper>
                <WrapperRow justifyContent="center" width="max-content" gap="10px">
                  <InputButton text="Valider" />
                  <SecondaryBtn onClick={handleLogout}>Se déconnecter</SecondaryBtn>
                </WrapperRow>
              </Wrapper>
            </WrapperRow>
          </form>
        </div>
      </Container>
    </main>
  );
}

export default Profil;