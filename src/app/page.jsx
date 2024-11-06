'use client';

import styles from "./page.module.scss";
import zigzag from "@/assets/zigzag.svg";
import OutilAvisCard from "@/components/Molecules/OutilAvisCard/OutilAvisCard";
import SearchBar from "@/components/Molecules/SearchBar/SearchBar";
import Img from "@/components/Atoms/Img/Img";
import H1 from "@/components/Atoms/Title/H1/H1";
import H2 from "@/components/Atoms/Title/H2/H2";
import Container from "@/components/Atoms/Container/Container";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import Mask from "@/components/Atoms/Mask/Mask";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [avis, setAvis] = useState([]);

  useEffect(() => {
    const chargerAvis = async () => {
      try {
        const reponse = await axios.get('http://localhost:3000/avis');
        const avisAuHasard = reponse.data.sort(() => 0.5 - Math.random()).slice(0, 3);
        setAvis(avisAuHasard);
      } catch (erreur) {
        console.error("Erreur lors de la récupération des avis:", erreur);
      }
    };
    chargerAvis();
  }, []);

  return (
  <main className={styles.main}>
    <div className={styles.hero}>
      <Mask backgroundColor="rgba(0, 0, 0, 0.5)"/>
      <div className={styles.hero_container}>
        <Img src={zigzag} width={70} height={15} objectFit="cover"/>
        <H1 color="#fff">Découvrez les meilleures solutions pour votre développement web</H1>
        <SearchBar/>
      </div>
    </div>

    <Container flexDirection="column" alignItems="center" gap="50px" paddingTop="100px">
      <H2>Selection d&aposavis sur les outils</H2>
      <WrapperRow width="100%" justifyContent="center" gap="20px" wrap="wrap">
        {avis.map(avis => (
            <OutilAvisCard 
              key={avis._id} 
              image={avis.outils.imageURL} 
              nom={avis.outils.name}
              avis={avis.message} 
              note={avis.note}
              starSize={20}
              nomUtilisateur={avis.user.name}
              outilId={avis.outils._id}
            />
        ))} 
      </WrapperRow>
    </Container>
  </main>
  );
}
