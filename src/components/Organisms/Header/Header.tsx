'use client'

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';
import Navbar from '../../Molecules/Navbar/Navbar';

const Header = () => {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const pagesAMasquer = ['/inscription', '/connexion', "/reinitialisation"];
    const doitMasquerHeader = pagesAMasquer.includes(pathname) || pathname.startsWith('/reset/');
    const pagesSpecifiques = ['/outils', '/categories'];
    const estSurPageSpecifique = pagesSpecifiques.includes(pathname) || pathname.startsWith('/outil/') || pathname.startsWith('/profil/') || pathname.startsWith('/admin');

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = document.documentElement.scrollTop;
            setIsScrolled(scrollTop > 100);
        };

        if (!estSurPageSpecifique && !doitMasquerHeader) {
            window.addEventListener('scroll', handleScroll);
        } else {
            setIsScrolled(false);
        }

        return () => {
            if (!estSurPageSpecifique && !doitMasquerHeader) {
                window.removeEventListener('scroll', handleScroll);
            }
        };
    }, [estSurPageSpecifique, doitMasquerHeader]);

    if (doitMasquerHeader) {
        return null;
    }

    const headerClass = estSurPageSpecifique || isScrolled ? styles.bleu : styles.transparent;

    return (
        <header className={`${styles.header} ${headerClass}`}>
            <Navbar />
        </header>
    );
}

export default Header;