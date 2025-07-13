'use client'

import Container from "@/components/Atoms/Container/Container";
import OutilCard from "@/components/Molecules/OutilCard/OutilCard";
import { useState, useEffect } from "react";
import styles from './page.module.scss';
import { Outil } from "@/types/Outil";
import { Grid } from '@radix-ui/themes';
import {useRouter} from "next/navigation";
import H1 from "@/components/Atoms/Title/H1/H1";

const Outils = () => {
  const [outils, setOutils] = useState<Outil[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOutils = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/outils`);
        const data = await response.json();
        setOutils(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOutils();
  }, []);

  return (
      <main className={styles.main}>
        <Container flexDirection="column" alignItems="center" gap="50px" paddingTop="100px">
          <H1>Liste des outils</H1>
          <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="4" width="100%">
            {outils.map(outil => (
                <OutilCard
                    key={outil._id}
                    image={outil.imageURL}
                    nom={outil.name}
                    description={outil.description}
                    onClick={() => router.push(`/outil/${outil._id}`)}
                />
            ))}
          </Grid>
        </Container>
      </main>
  );
}

export default Outils;