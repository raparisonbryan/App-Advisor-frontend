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
import { fetchRandomAvis } from "@/services/AvisService";
import heroBg from "@/assets/Hero.webp";

const HomeTemplate = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['avis'],
        queryFn: fetchRandomAvis,
        select: (data) => {
            return data.sort(() => 0.5 - Math.random()).slice(0, 3);
        }
    });
    const avis: Avis[] = data ?? [];

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

            <Container flexDirection="column" alignItems="center" gap="50px" paddingTop="100px">
                <H2>Selection d&apos;avis sur les outils</H2>

                {isLoading && <div>Chargement des avis...</div>}
                {isError && <div>Erreur: {error?.message || "Une erreur est survenue"}</div>}

                {!isLoading && !isError && (
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
        </main>
    );
}

export default HomeTemplate;