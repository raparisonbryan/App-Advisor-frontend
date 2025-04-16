'use client'

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';
import Navbar from '../../Molecules/Navbar/Navbar';

const Header = () => {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const pagesSpecifiques = ['/inscription', '/connexion', '/outils'];
    const estSurPageSpecifique = pagesSpecifiques.includes(pathname) || pathname.startsWith('/outil/') || pathname.startsWith('/profil/');

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 100);
        };

        if (!estSurPageSpecifique) {
            window.addEventListener('scroll', handleScroll);
        } else {
            setIsScrolled(false);
        }

        return () => {
            if (!estSurPageSpecifique) {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [estSurPageSpecifique]); 

    const headerClass = estSurPageSpecifique || isScrolled ? styles.bleu : styles.transparent;

    return (
        <header className={`${styles.header} ${headerClass}`}>
            <Navbar />
        </header>
    );
}

export default Header;