import logo from '@/assets/logo.png';
import Link from 'next/link';
import Button from '@/components/Atoms/Button/Button';
import Img from '@/components/Atoms/Img/Img';
import List from '@/components/Atoms/List/List';
import LinkItem from '@/components/Molecules/LinkItem/LinkItem';
import Container from '@/components/Atoms/Container/Container';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import styles from './Navbar.module.scss';
import WrapperRow from '@/components/Atoms/Wrapper/WrapperRow';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
import {MoonOutlined, SunOutlined} from "@ant-design/icons";

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    const { user } = useAuth();
    const userId = user ? user.id : null;
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Container justifyContent="space-between" alignItems="center" height="80px">
            <Link href="/">
                <Img src={logo} height={50} width={150} objectFit="cover"/>
            </Link>
            <List>
                <LinkItem href="/">Accueil</LinkItem>
                <LinkItem href="/categories">Catégories</LinkItem>
                <LinkItem href="/outils">Outils</LinkItem>
                {/*<LinkItem href="/Statistiques">Statistiques</LinkItem>*/}
            </List>
            <WrapperRow gap="20px">
                {user ? (
                    <Button onClick={() => router.push(`/profil/${userId}`)}>Profil</Button>
                ) : (
                    <Button onClick={() => router.push("/connexion")}>Connexion</Button>
                )}
                <button className={styles.icon} onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
                    {resolvedTheme === "light"
                        ? <SunOutlined />
                        : <MoonOutlined />
                    }
                </button>
            </WrapperRow>
        </Container>
    );
}