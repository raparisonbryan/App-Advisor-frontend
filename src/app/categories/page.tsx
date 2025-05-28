'use client';

import { useEffect, useState } from "react";
import { Categorie } from "@/types/Categorie";
import styles from "@/app/outils/page.module.scss";
import Container from "@/components/Atoms/Container/Container";
import H1 from "@/components/Atoms/Title/H1/H1";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import H2 from "@/components/Atoms/Title/H2/H2";
import Img from "@/components/Atoms/Img/Img";
import P from "@/components/Atoms/Paragraph/P";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";

const Categories = () => {
    const [categories, setCategories] = useState<Categorie[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <main className={styles.main}>
            <Container flexDirection="column" alignItems="center" gap="50px" paddingTop="100px">
                <H1>Catégories</H1>
                <Wrapper width="100%" justifyContent="flex-start" gap="100px">
                    {categories.map(categorie => (
                        <Wrapper key={categorie._id} gap="20px">
                            <H2>{categorie.name}</H2>
                            <WrapperRow gap="20px">
                                {categorie.outils.map(outil => (
                                    <Wrapper key={outil._id} gap="10px" alignItems="center">
                                        <Img src={outil.imageURL} height="80px" width="200px" objectFit="contain" />
                                        <P>{outil.name}</P>
                                    </Wrapper>
                                ))}
                            </WrapperRow>
                        </Wrapper>
                    ))}
                </Wrapper>

            </Container>
        </main>
    );
}

export default Categories;
