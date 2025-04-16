'use client'

import Rating from '@/components/Molecules/Rating/Rating';
import styles from './page.module.scss';
import Button from '@/components/Atoms/Button/Button';
import Img from '@/components/Atoms/Img/Img';
import Pourcentage from '@/components/Atoms/Pourcentage/Pourcentage';
import UserCard from '@/components/Molecules/UserCard/UserCard';
import Link from 'next/link';
import Container from '@/components/Atoms/Container/Container';
import Wrapper from '@/components/Atoms/Wrapper/Wrapper';
import H3 from '@/components/Atoms/Title/H3/H3';
import WrapperRow from '@/components/Atoms/Wrapper/WrapperRow';
import H1 from '@/components/Atoms/Title/H1/H1';
import P from '@/components/Atoms/Paragraph/P';
import Elipse from '@/components/Atoms/Elipse/Elipse';
import OutilImg from '@/components/Atoms/Img/OutilImg';
import H2 from '@/components/Atoms/Title/H2/H2';
import { useState, useEffect } from 'react';
import { Outil } from '@/types/Outil';
import { Avis } from '@/types/Avis';
import {useRouter} from "next/navigation";
import SecondaryBtn from "@/components/Atoms/Button/SecondaryBtn";
import {createPortal} from "react-dom";
import Modal from "@/components/Molecules/modal/Modal";
import {Col, Row} from "antd";
import {useParams} from "next/navigation";

const OutilDetail = () => {
  const params = useParams<{ id: string }>();
  const nbAvis = 12;
  const categorie = "Développement web";
  const [outil, setOutil] = useState<Outil>();
  const [afficherTous, setAfficherTous] = useState(false);
  const [avisList, setAvisList] = useState<Avis[]>([]);
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const chargerOutil = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/outils/${params.id}`);
        const data = await response.json();
        setOutil(data);
      } catch (erreur) {
        console.error("Erreur lors de la récupération de l'outil:", erreur);
      }
    };

    const fetchAvis = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/avis/outil/${params.id}`);
        const data = await response.json();
        setAvisList(data.sort(() => 0.5 - Math.random()));
      } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error);
      }
    };

    fetchAvis();
    chargerOutil();
  }, [params.id]);

  const avisAffiches = afficherTous ? avisList : avisList.slice(0, 3);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!outil) {
    return (
        <main className={styles.main}>
          <Container alignItems="center" justifyContent="center" height="100vh">
            <P>Chargement...</P>
          </Container>
        </main>
    );
  }

  return (
      <main className={styles.main}>
        <Container paddingTop="100px" alignItems="center" justifyContent="space-between" height="100vh">
          <Wrapper width="40%" gap="15px">
            <div>
              <H3 color="#DF6951">{categorie}</H3>
              <WrapperRow alignItems="center" gap="10px">
                <H1>{outil.name}</H1>
                <Rating note={4} starSize={25}/>
                <P>({nbAvis} avis)</P>
              </WrapperRow>
            </div>
            <div>
              <Elipse>{outil.description}</Elipse>
              <Link style={{textDecoration: "underline"}} href={"#description"}>Voir plus</Link>
            </div>
            <Button onClick={openModal}>Donner un avis</Button>
          </Wrapper>
          <WrapperRow width="50%" height="400px" alignItems="center" justifyContent="center">
            <OutilImg>
              <Img src={outil.imageURL} height="50%" width="100%" objectFit="scale-down"/>
            </OutilImg>
          </WrapperRow>
        </Container>

        <Container id="description" alignItems="center" justifyContent="space-between">
          <Wrapper width="40%" gap="15px">
            <H2>Description</H2>
            <P>{outil?.description}</P>
            <WrapperRow alignItems="center" gap="10px">
              <Button onClick={() => router.push("/Statistiques")}>Classement</Button>
              <SecondaryBtn onClick={openModal}>Donner un avis</SecondaryBtn>
            </WrapperRow>
          </Wrapper>
          <WrapperRow width="40%" alignItems="center" justifyContent="space-between">
            <Wrapper justifyContent="center" alignItems="center" gap="10px">
              <Pourcentage percentage={80} colorStart="#FF4098" colorEnd="#FFB47D"/>
              <P>Difficulté</P>
            </Wrapper>
            <Wrapper justifyContent="center" alignItems="center" gap="10px">
              <Pourcentage percentage={60} colorStart="#10E7FF" colorEnd="#8437FF"/>
              <P>Performance</P>
            </Wrapper>
            <Wrapper justifyContent="center" alignItems="center" gap="10px">
              <Pourcentage percentage={40} colorStart="#D820F9" colorEnd="#7202FF"/>
              <P>Flexibilité</P>
            </Wrapper>
          </WrapperRow>
        </Container>

        <Container flexDirection="column" alignItems="center" paddingTop="100px" gap="50px">
          <H2>Avis</H2>
          <Row gutter={[16, 16]} className={styles.avis_wrapper}>
            {avisAffiches.map((avis, index) => (
                <Col key={index} span={24} sm={12} lg={8}>
                  <UserCard
                      avis={avis.message}
                      nomUtilisateur={avis.user.name}
                      note={avis.note}
                  />
                </Col>
            ))}
          </Row>
          {!afficherTous && avisList.length > 3 && (
              <button className={styles.button} onClick={() => setAfficherTous(true)}>Voir plus</button>
          )}
        </Container>

        {createPortal(
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                outilId={params.id}
            />,
            document.body
        )}
      </main>
  );
}

export default OutilDetail;