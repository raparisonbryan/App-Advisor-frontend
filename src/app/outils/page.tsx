'use client'

import Container from "@/components/Atoms/Container/Container";
import OutilCard from "@/components/Molecules/OutilCard/OutilCard";
import styles from './page.module.scss';
import { Grid, Flex } from '@radix-ui/themes';
import {useRouter} from "next/navigation";
import H1 from "@/components/Atoms/Title/H1/H1";
import { useQuery } from '@tanstack/react-query';
import { getOutils } from '@/services/OutilService';
import { useState, useMemo } from 'react';
import InputSearch from "@/components/Atoms/Input/InputSearch";

const Outils = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: outils = [], isLoading } = useQuery({
    queryKey: ['outils'],
    queryFn: getOutils,
  });

  const filteredOutils = useMemo(() => {
    if (!searchQuery.trim()) {
      return outils;
    }
    return outils.filter(outil => 
      outil.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [outils, searchQuery]);

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
          
          <Flex width="100%" maxWidth="600px" justify="start">
            <InputSearch 
              type="text" 
              placeholder="Rechercher un outil..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Flex>

          <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="4" width="100%">
            {filteredOutils.map(outil => (
                <OutilCard
                    key={outil._id}
                    image={outil.imageURL}
                    nom={outil.name}
                    description={outil.description}
                    onClick={() => router.push(`/outil/${outil._id}`)}
                />
            ))}
          </Grid>
          
          {searchQuery && filteredOutils.length === 0 && (
            <div>Aucun outil trouvé pour "{searchQuery}"</div>
          )}
        </Container>
      </main>
  );
}

export default Outils;