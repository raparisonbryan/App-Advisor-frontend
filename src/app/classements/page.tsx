"use client";

import {Tabs, Table, Text, Badge, Flex} from "@radix-ui/themes";
import Container from "@/components/Atoms/Container/Container";
import H1 from "@/components/Atoms/Title/H1/H1";
import { fetchCategories } from "@/services/CatégorieService";
import { Categorie } from "@/types/Categorie";
import Image from "next/image";
import styles from "./page.module.scss";
import P from "@/components/Atoms/Paragraph/P";
import { useQuery } from '@tanstack/react-query';

export default function Classements() {
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (isLoading) return <div style={{textAlign: 'center', marginTop: 50}}>Chargement...</div>;
  if (error) return <div style={{color: 'red', textAlign: 'center', marginTop: 50}}>{(error as Error).message}</div>;
  if (!categories.length) return <div style={{textAlign: 'center', marginTop: 50}}>Aucune catégorie trouvée.</div>;

  return (
    <main className={styles.main}>
      <Container flexDirection="column" alignItems="center" gap="50px" paddingTop="100px">
        <H1>Classement des outils par catégorie</H1>
        <Tabs.Root className={styles.tab} defaultValue={categories[0]._id}>
          <Tabs.List color="orange" className={styles.list}>
            {categories.map((cat: Categorie) => (
              <Tabs.Trigger className={styles.trigger} value={cat._id} key={cat._id}>
                {cat.name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {categories.map((cat: Categorie) => (
            <Tabs.Content value={cat._id} key={cat._id}>
              <Table.Root variant="surface" size="3" className={styles.table}>
                  <Table.Header>
                    <Table.Row>
                      <Table.ColumnHeaderCell justify="center">Position</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Nom</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Note moyenne</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Nombre d&#39;avis</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Difficulté</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Performance</Table.ColumnHeaderCell>
                      <Table.ColumnHeaderCell>Flexibilité</Table.ColumnHeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {[...cat.outils]
                      .sort((a, b) => b.moyenneNote - a.moyenneNote)
                      .map((outil, idx) => (
                        <Table.Row key={outil._id } onClick={() => window.location.href = `/outil/${outil._id}`} className={styles.row}>
                          <Table.RowHeaderCell justify="center">
                            <Badge color={idx === 0 ? "gold" : idx === 1 ? "bronze" : idx === 2 ? "brown" : "gray"} size="3" variant="solid" radius="full">
                              {idx + 1}
                            </Badge>
                          </Table.RowHeaderCell>
                          <Table.Cell>
                            <Flex align="center" gap="10px">
                              <Image src={outil.imageURL} alt={outil.name} width={48} height={32} style={{objectFit: 'contain'}} />
                              <P>{outil.name}</P>
                            </Flex>
                          </Table.Cell>
                          <Table.Cell >
                            <Text weight="bold" color="orange" size="4">{outil.moyenneNote?.toFixed(2) ?? '-'}</Text>
                          </Table.Cell>
                          <Table.Cell >{outil.nombreAvis ?? '-'}</Table.Cell>
                          <Table.Cell >{outil.moyenneDifficulte?.toFixed(2) ?? '-'}</Table.Cell>
                          <Table.Cell >{outil.moyennePerformance?.toFixed(2) ?? '-'}</Table.Cell>
                          <Table.Cell >{outil.moyenneFlexibilite?.toFixed(2) ?? '-'}</Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                </Table.Root>
            </Tabs.Content>
          ))}
        </Tabs.Root>
      </Container>
    </main>
  );
}
