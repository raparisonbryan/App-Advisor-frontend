'use client'

import Container from "@/components/Atoms/Container/Container";
import H2 from "@/components/Atoms/Title/H2/H2";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import OutilCard from "@/components/Molecules/OutilCard/OutilCard";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from './page.module.scss';

export default function Outils() {
    const [outils, setOutils] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/outils")
        .then(response => {
            setOutils(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    });

  return (
    <main className={styles.main}>
        <Container flexDirection="column" alignItems="center" gap="50px" paddingTop="100px">
            <H2>Selection d&aposoutils sur les outils</H2>
            <WrapperRow width="100%" justifyContent="center" gap="20px" wrap="wrap">
                {outils.map(outils => (
                    <OutilCard 
                    key={outils._id} 
                    image={outils.imageURL} 
                    nom={outils.name}
                    description={outils.description}
                    outilId={outils._id}
                    />
                ))} 
            </WrapperRow>
        </Container>
    </main>
  );
}