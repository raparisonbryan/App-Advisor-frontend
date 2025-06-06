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
import {useRouter} from "next/navigation";
import Loading from "@/components/Molecules/Loading/Loading";


const Categories = () => {
    const [categories, setCategories] = useState<Categorie[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <main className={styles.main}>
                <Container flexDirection="column" alignItems="center" justifyContent="center" gap="50px" paddingTop="100px" height="100vh">
                    <Loading />
                </Container>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <Container flexDirection="column" alignItems="center" gap="60px" paddingTop="100px">
                <div className={styles.header}>
                    <H1>Catégories d&apos;Outils</H1>
                    <P className={styles.subtitle}>
                        Découvrez nos {categories.reduce((total, cat) => total + cat.outils.length, 0)} outils
                        répartis en {categories.length} catégories
                    </P>
                </div>

                <Wrapper width="100%" gap="40px" className={styles.categories_grid}>
                    {categories.map((categorie, index) => (
                        <div
                            key={categorie._id}
                            className={`${styles.category_card} ${styles.fadeIn}`}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={styles.category_header}>
                                <H2 className={styles.category_title}>{categorie.name}</H2>
                                <div className={styles.tools_counter}>
                                    <span className={styles.counter_number}>{categorie.outils.length}</span>
                                    <span className={styles.counter_text}>
                                        {categorie.outils.length > 1 ? 'outils' : 'outil'}
                                    </span>
                                </div>
                            </div>

                            <WrapperRow gap="20px" className={styles.tools_wrapper}>
                                {categorie.outils.map((outil, toolIndex) => (
                                    <button
                                        key={outil._id}
                                        className={`${styles.tool_card} ${styles.slideIn}`}
                                        style={{ animationDelay: `${(index * 0.1) + (toolIndex * 0.05)}s` }}
                                        onClick={() => router.push(`/outil/${outil._id}`)}
                                    >
                                        <div className={styles.tool_image_container}>
                                            <Img
                                                src={outil.imageURL}
                                                height="60px"
                                                width="160px"
                                                objectFit="contain"
                                            />
                                        </div>
                                        <P className={styles.tool_name}>{outil.name}</P>
                                    </button>
                                ))}
                            </WrapperRow>
                        </div>
                    ))}
                </Wrapper>
            </Container>
        </main>
    );
}

export default Categories;