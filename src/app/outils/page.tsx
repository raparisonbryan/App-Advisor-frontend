'use client'

import Container from "@/components/Atoms/Container/Container";
import OutilCard from "@/components/Molecules/OutilCard/OutilCard";
import styles from './page.module.scss';
import { Grid } from '@radix-ui/themes';
import {useRouter} from "next/navigation";
import H1 from "@/components/Atoms/Title/H1/H1";
import { useQuery } from '@tanstack/react-query';
import { getOutils } from '@/services/OutilService';

const Outils = () => {
  const router = useRouter();
  const { data: outils = [], isLoading } = useQuery({
    queryKey: ['outils'],
    queryFn: getOutils,
  });

  if (isLoading) {
    return (
      <main className={styles.main}>
        <Container flexDirection="column" alignItems="center" gap="50px" paddingTop="100px">
          <H1>Liste des outils</H1>
          <div>Chargement...</div>
        </Container>
      </main>
    );
  }

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