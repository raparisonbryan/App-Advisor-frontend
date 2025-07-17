import styles from './Footer.module.scss';
import Link from 'next/link';
import Img from '@/components/Atoms/Img/Img';
import logo from '@/assets/logo.png';
import Container from "@/components/Atoms/Container/Container";
import {Flex} from "@radix-ui/themes";
import {GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon} from "@radix-ui/react-icons";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container justifyContent="space-between">
                <Flex direction="column" gap="10px">
                    <Link href="/">
                    <Img src={logo} height={50} width={150} objectFit="cover"/>
                    </Link>
                    <div className={styles.legales}>
                    &copy; {new Date().getFullYear()} AppAdvisor. Tous droits réservés.
                    </div>
                </Flex>

                <Flex width="50%" height="100%" align="end" direction="column" gap="20px">
                    <nav className={styles.links} aria-label="Pages principales">
                        <Link href="/" className={styles.link}>Accueil</Link>
                        <Link href="/categories" className={styles.link}>Catégories</Link>
                        <Link href="/outils" className={styles.link}>Outils</Link>
                        <Link href="/classements" className={styles.link}>Classements</Link>
                    </nav>
                    <div className={styles.separator} />
                    <nav className={styles.logos} aria-label="Réseaux sociaux">
                        <Link href="/" className={styles.link}>
                            <GitHubLogoIcon width={25} height={25} />
                        </Link>
                        <Link href="/" className={styles.link}>
                            <TwitterLogoIcon width={25} height={25} />
                        </Link>
                        <Link href="/" className={styles.link}>
                            <InstagramLogoIcon width={25} height={25} />
                        </Link>
                        <Link href="/" className={styles.link}>
                            <LinkedInLogoIcon width={25} height={25} />
                        </Link>
                    </nav>
                </Flex>
            </Container>
        </footer>
    );
};

export default Footer;
