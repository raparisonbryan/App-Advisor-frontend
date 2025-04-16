'use client'

import Container from "@/components/Atoms/Container/Container";
import H2 from "@/components/Atoms/Title/H2/H2";
import OutilCard from "@/components/Molecules/OutilCard/OutilCard";
import { useState, useEffect } from "react";
import styles from './page.module.scss';
import { Outil } from "@/types/Outil";
import {Col, Row} from "antd";

const Outils = () => {
  const [outils, setOutils] = useState<Outil[]>([]);

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
        <H2>Liste des outils</H2>
        <Row gutter={[16, 16]} className={styles.avis_wrapper}>
          {outils.map(outil => (
              <Col key={outil._id} span={24} sm={12} lg={8}>
                <OutilCard
                  image={outil.imageURL}
                  nom={outil.name}
                  description={outil.description}
                  outilId={outil._id}
                />
              </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
}

export default Outils;