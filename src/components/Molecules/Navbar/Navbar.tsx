import logo from '@/assets/logo.png';
import Link from 'next/link';
import Btn from '@/components/Atoms/Button/Btn';
import Img from '@/components/Atoms/Img/Img';
import List from '@/components/Atoms/List/List';
import LinkItem from '@/components/Molecules/LinkItem/LinkItem';
import Container from '@/components/Atoms/Container/Container';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import WrapperRow from '@/components/Atoms/Wrapper/WrapperRow';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from 'next/navigation';
import { MoonIcon, SunIcon, HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons";
import IconBtn from "@/components/Atoms/Button/IconBtn";
import styles from './Navbar.module.scss';

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    const { user } = useAuth();
    const userId = user ? user.id : null;
    const router = useRouter();

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleMenu = () => {
        if (isMenuOpen) {
            closeMenu();
        } else {
            setIsMenuOpen(true);
        }
    };

    const closeMenu = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsMenuOpen(false);
            setIsClosing(false);
        }, 300); // Durée de l'animation
    };

    if (!mounted) {
        return null;
    }

    return (
        <>
            <Container justifyContent="space-between" alignItems="center" height="80px">
                <Link href="/">
                    <Img src={logo} height={50} width={150} objectFit="cover"/>
                </Link>
                <div className={styles.desktop_menu}>
                    <List>
                        <LinkItem href="/categories">Catégories</LinkItem>
                        <LinkItem href="/outils">Outils</LinkItem>
                        <LinkItem href="/classements">Classements</LinkItem>
                    </List>
                </div>
                <div className={styles.desktop_menu}>
                    <WrapperRow gap="20px">
                        {user ? (
                            <Btn onClick={() => router.push(`/profil/${userId}`)}>Profil</Btn>
                        ) : (
                            <Btn onClick={() => router.push("/connexion")}>Connexion</Btn>
                        )}
                        <IconBtn onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
                            {resolvedTheme === "light" ? <MoonIcon /> : <SunIcon />}
                        </IconBtn>
                    </WrapperRow>
                </div>

                <div className={styles.mobile_trigger}>
                    <WrapperRow gap="10px">
                        <IconBtn onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}>
                            {resolvedTheme === "light" ? <MoonIcon /> : <SunIcon />}
                        </IconBtn>
                        <IconBtn onClick={toggleMenu}>
                            {isMenuOpen ? <Cross1Icon /> : <HamburgerMenuIcon />}
                        </IconBtn>
                    </WrapperRow>
                </div>
            </Container>

            {isMenuOpen && (
                <div className={`${styles.overlay} ${isClosing ? styles.closing : ''}`}>
                    <Container justifyContent="space-between" alignItems="center" height="80px">
                        <Link href="/" onClick={closeMenu}>
                            <Img src={logo} height={50} width={150} objectFit="cover"/>
                        </Link>
                        <IconBtn onClick={closeMenu}>
                            <Cross1Icon />
                        </IconBtn>
                    </Container>

                    <div className={styles.mobile_content}>
                        <Link href="/categories" onClick={closeMenu}>
                            <span>Catégories</span>
                        </Link>
                        <Link href="/outils" onClick={closeMenu}>
                            <span>Outils</span>
                        </Link>
                        <Link href="/classements" onClick={closeMenu}>
                            <span>Classements</span>
                        </Link>
                        <div className={styles.mobile_button}>
                            {user ? (
                                <Btn onClick={() => {
                                    router.push(`/profil/${userId}`);
                                    closeMenu();
                                }}>
                                    Profil
                                </Btn>
                            ) : (
                                <Btn onClick={() => {
                                    router.push("/connexion");
                                    closeMenu();
                                }}>
                                    Connexion
                                </Btn>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}