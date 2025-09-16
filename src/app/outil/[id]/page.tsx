'use client'

import Rating from '@/components/Molecules/Rating/Rating';
import styles from './page.module.scss';
import Btn from '@/components/Atoms/Button/Btn';
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
import { useState } from 'react';
import { useRouter } from "next/navigation";
import SecondaryBtn from "@/components/Atoms/Button/SecondaryBtn";
import Modal from "@/components/Molecules/Modal/Modal";
import { useParams } from "next/navigation";
import { Grid, Flex } from "@radix-ui/themes";
import { useQuery } from '@tanstack/react-query';
import { getOutilById } from '@/services/OutilService';
import { fetchAvisByOutil } from '@/services/AvisService';

const OutilDetail = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [afficherTous, setAfficherTous] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: outil, isLoading: isLoadingOutil } = useQuery({
    queryKey: ['outil', params.id],
    queryFn: () => getOutilById(params.id),
    enabled: !!params.id,
  });

  const { data: avisList = [], isLoading: isLoadingAvis } = useQuery({
    queryKey: ['avis', params.id],
    queryFn: () => fetchAvisByOutil(params.id),
    enabled: !!params.id,
    select: (data) => data.sort(() => 0.5 - Math.random()),
  });

  const avisAffiches = afficherTous ? avisList : avisList.slice(0, 3);

  if (isLoadingOutil || !outil) {
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
        <Container paddingTop="100px" height="100vh">
          <Flex className={styles.flex} height="100%">
            <Wrapper className={styles.header_text}>
              <div>
                <H3 color="#DF6951">{outil.categories?.[0]?.name || "Catégorie"}</H3>
                <WrapperRow alignItems="center" gap="10px">
                  <H1>{outil.name}</H1>
                  <Rating note={Math.round(outil.moyenneNote || 0)} starSize={25}/>
                  <P>({outil.nombreAvis || 0} avis)</P>
                </WrapperRow>
              </div>
              <div>
                <Elipse>{outil.description}</Elipse>
                <Link style={{textDecoration: "underline"}} href={"#description"}>Voir plus</Link>
              </div>
              <Modal
                  open={isModalOpen}
                  onOpenChange={setIsModalOpen}
                  outilId={params.id}
              >
                <Btn onClick={() => setIsModalOpen(true)}>Donner un avis</Btn>
              </Modal>
            </Wrapper>
            <Wrapper className={styles.outil_img}>
              <OutilImg>
                <Img src={outil.imageURL} height="50%" width="100%" objectFit="scale-down"/>
              </OutilImg>
            </Wrapper>
          </Flex>
        </Container>

        <Container paddingTop="100px" id="description" alignItems="center" justifyContent="space-between">
          <Flex className={styles.description_flex}>
            <Wrapper className={styles.description_text}>
              <H2>Description</H2>
              <P>{outil?.description}</P>
              <WrapperRow alignItems="center" gap="10px">
                <Btn onClick={() => router.push("/classements")}>Classement</Btn>
                <Modal
                    open={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    outilId={params.id}
                >
                  <SecondaryBtn onClick={() => setIsModalOpen(true)}>Donner un avis</SecondaryBtn>
                </Modal>
              </WrapperRow>
            </Wrapper>
            <Flex className={styles.description_stats}>
              <Wrapper justifyContent="center" alignItems="center" gap="10px">
                <Pourcentage 
                  percentage={Math.round(outil.moyenneDifficulte || 0)} 
                  colorStart="#FF4098" 
                  colorEnd="#FFB47D"
                  showAsNote={true}
                  maxNote={20}
                />
                <P>Difficulté</P>
              </Wrapper>
              <Wrapper justifyContent="center" alignItems="center" gap="10px">
                <Pourcentage 
                  percentage={Math.round(outil.moyennePerformance || 0)} 
                  colorStart="#10E7FF" 
                  colorEnd="#8437FF"
                  showAsNote={true}
                  maxNote={20}
                />
                <P>Performance</P>
              </Wrapper>
              <Wrapper justifyContent="center" alignItems="center" gap="10px">
                <Pourcentage 
                  percentage={Math.round(outil.moyenneFlexibilite || 0)} 
                  colorStart="#D820F9" 
                  colorEnd="#7202FF"
                  showAsNote={true}
                  maxNote={20}
                />
                <P>Flexibilité</P>
              </Wrapper>
            </Flex>
          </Flex>
        </Container>

        <Container flexDirection="column" alignItems="center" paddingTop="100px" gap="50px">
          <H2>Avis</H2>
          {isLoadingAvis ? <P>Chargement des avis...</P> : (
            avisList.length === 0 ? (
              <Container flexDirection="column" alignItems="center" gap="20px">
                <P>Aucun avis pour cet outil pour le moment.</P>
                <P>Soyez le premier à donner votre avis !</P>
                <Modal
                    open={isModalOpen}
                    onOpenChange={setIsModalOpen}
                    outilId={params.id}
                >
                  <Btn onClick={() => setIsModalOpen(true)}>Donner un avis</Btn>
                </Modal>
              </Container>
            ) : (
              <>
                <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="4" width="100%">
                  {avisAffiches.map((avis, index) => (
                      <UserCard
                          key={index}
                          avis={avis.message}
                          nomUtilisateur={avis.user.name}
                          note={avis.note}
                      />
                  ))}
                </Grid>
                {!afficherTous && avisList.length > 3 && (
                    <Btn onClick={() => setAfficherTous(true)}>Voir plus</Btn>
                )}
              </>
            )
          )}
        </Container>
      </main>
  );
}

export default OutilDetail;