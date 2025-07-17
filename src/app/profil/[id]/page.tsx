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
import { useAuth } from "@/context/AuthContext";
import {useParams, useRouter} from "next/navigation";
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUserById, updateUserById } from '@/services/AuthService';

const Profil = () => {
  const params = useParams<{ id: string }>();
  const { logout } = useAuth();
  const router = useRouter();

  const { data: userProfil, refetch } = useQuery({
    queryKey: ['user', params.id],
    queryFn: () => getUserById(params.id),
    enabled: !!params.id,
  });

  const mutation = useMutation({
    mutationFn: (user: { name: string; email: string }) => updateUserById({ id: params.id, user }),
    onSuccess: () => {
      alert('profil mis à jour avec succès!');
      refetch();
    },
    onError: (error: any) => {
      alert(error.message || 'Erreur lors de la mise à jour du profil');
    },
  });

  const [form, setForm] = useState<{ name: string; email: string }>({ name: '', email: '' });

  useEffect(() => {
    if (userProfil) {
      setForm({ name: userProfil.name || '', email: userProfil.email || '' });
    }
  }, [userProfil]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate(form);
  };

  const handleLogout = async () => {
    try {
      await logout(); 
    } catch (e) {
      console.error(e);
    } finally {
      router.push('/connexion'); 
    }
  };

    const handleAdmin = () => {
        router.push('/admin');
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
                  <InputText type="text" name="name" value={form.name} onChange={handleChange} />
                </Wrapper>
                <Wrapper width="100%" gap="10px">
                  <InputText type="email" name="email" value={form.email} onChange={handleChange} />
                </Wrapper>
                <WrapperRow justifyContent="center" width="max-content" gap="10px">
                  <InputButton text={mutation.isPending ? "Mise à jour..." : "Valider"} disabled={mutation.isPending} />
                  {userProfil?.Admin === true && (
                      <SecondaryBtn onClick={handleAdmin}>Dashboard</SecondaryBtn>
                  )}
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