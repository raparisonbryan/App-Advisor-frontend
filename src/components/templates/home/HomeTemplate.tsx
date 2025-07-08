'use client';

import { useQuery } from '@tanstack/react-query';
import styles from "./HomeTemplate.module.scss";
import zigzag from "@/assets/zigzag.svg";
import OutilAvisCard from "@/components/Molecules/OutilAvisCard/OutilAvisCard";
import SearchBar from "@/components/Molecules/SearchBar/SearchBar";
import Img from "@/components/Atoms/Img/Img";
import H1 from "@/components/Atoms/Title/H1/H1";
import H2 from "@/components/Atoms/Title/H2/H2";
import Container from "@/components/Atoms/Container/Container";
import Mask from "@/components/Atoms/Mask/Mask";
import {Col, Row} from "antd";
import { Avis } from "@/types/Avis";
import { Categorie } from "@/types/Categorie";
import { fetchRandomAvis } from "@/services/AvisService";
import { fetchCategories} from "@/services/CatégorieService";
import heroBg from "@/assets/Hero.webp";
import Loading from "@/components/Molecules/Loading/Loading";
import Button from "@/components/Atoms/Button/Button";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import H3 from "@/components/Atoms/Title/H3/H3";
import { getCategoryIcon } from "@/components/Atoms/Icons/CategoryIcons";
import {useRouter} from "next/navigation";

const HomeTemplate = () => {
    const router = useRouter();
    const { data: avisData, isLoading: isAvisLoading } = useQuery({
        queryKey: ['avis'],
        queryFn: fetchRandomAvis,
        select: (data) => {
            return data.sort(() => 0.5 - Math.random()).slice(0, 3);
        }
    });
    const avis: Avis[] = avisData ?? [];

    const {data: categorieData, isLoading: IsCategorieLoading} = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
    const categories: Categorie[] = categorieData ?? [];

    return (
        <main className={styles.main}>
            <div className={styles.hero} style={{ backgroundImage: `url(${heroBg.src})` }}>
                <Mask backgroundColor="rgba(0, 0, 0, 0.5)"/>
                <div className={styles.hero_container}>
                    <Img src={zigzag} width={70} height={15} objectFit="cover"/>
                    <H1 color="#fff">Découvrez les meilleures solutions pour votre développement web</H1>
                    <SearchBar/>
                </div>
            </div>

            <div className={styles.section}>
                <Container flexDirection="column" alignItems="center" gap="50px" paddingTop="100px">
                    <H2>Sélection d&apos;avis sur les outils</H2>

                    {isAvisLoading ? (
                        <Loading />
                    ) : (
                        <Row gutter={[16, 16]} className={styles.avis_wrapper}>
                            {avis.map(avis => (
                                <Col key={avis._id} span={24} sm={12} lg={8}>
                                    <OutilAvisCard
                                        image={avis.outils.imageURL}
                                        nom={avis.outils.name}
                                        avis={avis.message}
                                        note={avis.note}
                                        starSize={20}
                                        nomUtilisateur={avis.user.name}
                                        outilId={avis.outils._id}
                                    />
                                </Col>
                            ))}
                        </Row>
                    )}
                </Container>

                <Container flexDirection="column" alignItems="center" gap="60px" paddingTop="100px">
                    <H2>Explorez les catégories</H2>

                    {IsCategorieLoading ? (
                        <Loading />
                    ) : (
                        <WrapperRow wrap="wrap" width="100%" gap="20px">
                            {categories.map((categorie, index) => {
                                const categorieClass = 'categorie_' + (index + 1);
                                return (
                                    <div
                                        key={categorie._id}
                                        className={`${styles.categorie} ${styles[categorieClass]}`}
                                    >
                                        <H3>{categorie.name}</H3>
                                        <div className={styles.icon_container}>
                                            {getCategoryIcon(categorie.name, index)}
                                        </div>
                                        <WrapperRow gap="8px">
                                            {categorie.outils.slice(0, 2).map(outil => (
                                                <button key={outil._id} className={styles.outil} onClick={() =>  router.push(`/outil/${outil._id}`)}>
                                                    <span>{outil.name}</span>
                                                </button>
                                            ))}
                                            {categorie.outils.length > 2 && (
                                                <button className={styles.outil} onClick={() => router.push(`/categories`)}>
                                                    <span>+{categorie.outils.length - 2} autres</span>
                                                </button>
                                            )}
                                        </WrapperRow>
                                    </div>
                                );
                            })}
                        </WrapperRow>
                    )}

                    <Button>Voir toutes les catégories</Button>
                </Container>
            </div>
        </main>
    );
}

export default HomeTemplate;