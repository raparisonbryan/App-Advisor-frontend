import styles from './Footer.module.scss';
import Link from 'next/link';
import Img from '@/components/Atoms/Img/Img';
import logo from '@/assets/logo.png';
import {Flex} from "@radix-ui/themes";
import {GitHubLogoIcon, InstagramLogoIcon, LinkedInLogoIcon, TwitterLogoIcon} from "@radix-ui/react-icons";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Flex className={styles.footer_wrapper} justify="between">
                <Flex align={{initial: "center", sm: "start"}} direction="column" gap="10px">
                    <Link href="/">
                        <Img src={logo} height={50} width={150} objectFit="cover"/>
                    </Link>
                    <span>&copy; {new Date().getFullYear()} AppAdvisor. Tous droits réservés.</span>
                </Flex>

                <Flex width={{initial: "100%", sm: "50%"}} height="100%" align={{initial: "center", sm: "end"}} direction="column" gap="20px">
                    <nav className={styles.links} aria-label="Pages principales">
                        <Link href="/" className={styles.link}>Accueil</Link>
                        <Link href="/categories" className={styles.link}>Catégories</Link>
                        <Link href="/outils" className={styles.link}>Outils</Link>
                        <Link href="/classements" className={styles.link}>Classements</Link>
                    </nav>
                    <div className={styles.separator} />
                    <nav className={styles.logos} aria-label="Réseaux sociaux">
                        <Link href="https://github.com/raparisonbryan" className={styles.link} target="_blank" rel="noopener noreferrer">
                            <GitHubLogoIcon width={25} height={25} />
                        </Link>
                        <Link href="https://x.com/raparisonbryan1" className={styles.link} target="_blank" rel="noopener noreferrer">
                            <TwitterLogoIcon width={25} height={25} />
                        </Link>
                        <Link href="https://www.instagram.com/raparisonn/" className={styles.link} target="_blank" rel="noopener noreferrer">
                            <InstagramLogoIcon width={25} height={25} />
                        </Link>
                        <Link href="https://www.linkedin.com/in/bryan-raparison/" className={styles.link} target="_blank" rel="noopener noreferrer">
                            <LinkedInLogoIcon width={25} height={25} />
                        </Link>
                    </nav>
                </Flex>
            </Flex>
        </footer>
    );
};

export default Footer;
