'use client'

import styles from "./page.module.scss";
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Container from '@/components/Atoms/Container/Container';
import Wrapper from '@/components/Atoms/Wrapper/Wrapper';
import H2 from '@/components/Atoms/Title/H2/H2';
import InputButton from '@/components/Atoms/Input/InputButton';
import InputText from "@/components/Atoms/Input/InputText";
import SecondaryBtn from "@/components/Atoms/Button/SecondaryBtn";
import { useAuth } from "@/context/AuthContext";
import {useParams, useRouter} from "next/navigation";
import { useQuery, useMutation } from '@tanstack/react-query';
import { getUserById, updateCurrentUser } from '@/services/AuthService';
import {Flex} from "@radix-ui/themes";
import Toast from "@/components/Atoms/Toast/Toast";
import { useToast } from "@/hooks/useToast";

const Profil = () => {
  const params = useParams<{ id: string }>();
  const { logout, user } = useAuth();
  const router = useRouter();
  const { toast, showSuccess, showError, hideToast } = useToast();
  const userId = user?.id || params.id;

  const { data: userProfil, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId && !!user?.id, 
  });

  const mutation = useMutation({
    mutationFn: (user: { name: string; email: string }) => updateCurrentUser(user),
    onSuccess: () => {
      showSuccess('Profil mis à jour !');
      refetch();
    },
    onError: (error: any) => {
      showError('Erreur', error.message || 'Erreur lors de la mise à jour du profil');
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
    
    if (!user?.id) {
      showError('Erreur', 'Vous devez être connecté pour modifier votre profil.');
      return;
    }
    
    if (user?.id !== params.id) {
      showError('Erreur', 'Vous ne pouvez modifier que votre propre profil.');
      return;
    }
    
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
        {userProfil?.Admin === true && (
            <SecondaryBtn className={styles.admin_btn} onClick={handleAdmin}>Dashboard</SecondaryBtn>
        )}
        <div className={styles.form_wrapper}>
          <H2>Profil</H2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <Flex direction="column" gap="10px" width="100%">
              <Wrapper width="100%" gap="10px">
                <InputText type="text" name="name" value={form.name} onChange={handleChange} />
              </Wrapper>
              <Wrapper width="100%" gap="10px">
                <InputText type="email" name="email" value={form.email} onChange={handleChange} />
              </Wrapper>
            </Flex>
            <Flex className={styles.btn_wrapper}>
              <InputButton text={mutation.isPending ? "Mise à jour..." : "Valider"} disabled={mutation.isPending} />
              <SecondaryBtn onClick={handleLogout}>Se déconnecter</SecondaryBtn>
            </Flex>
          </form>
        </div>
      </Container>
      
      <Toast
        open={toast.open}
        onOpenChange={hideToast}
        title={toast.title}
        description={toast.description}
        type={toast.type}
      />
    </main>
  );
}

export default Profil;