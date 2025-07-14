"use client"

import {Tabs} from "@radix-ui/themes";
import OutilsTable from "@/components/Organisms/admin/Outils";
import AvisTable from "@/components/Organisms/admin/Avis";
import UsersTable from "@/components/Organisms/admin/Users";
import CategoriesTable from "@/components/Organisms/admin/Categories";
import styles from "@/app/admin/page.module.scss";
import Container from "@/components/Atoms/Container/Container";
import H1 from "@/components/Atoms/Title/H1/H1";

export default function AdminDashboard() {
    return (
        <main className={styles.main}>
            <Container flexDirection="column" alignItems="center" gap="50px" paddingTop="100px">
                <H1>Dashboard Admin</H1>
                <Tabs.Root className={styles.tab} defaultValue="avis">
                    <Tabs.List color="orange" className={styles.list}>
                        <Tabs.Trigger className={styles.trigger} value="avis">
                            Avis
                        </Tabs.Trigger>
                        <Tabs.Trigger className={styles.trigger} value="outils">
                            Outils
                        </Tabs.Trigger>
                        <Tabs.Trigger className={styles.trigger} value="utilisateurs">
                            Utilisateurs
                        </Tabs.Trigger>
                        <Tabs.Trigger className={styles.trigger} value="categories">
                            Catégories
                        </Tabs.Trigger>
                    </Tabs.List>

                    <Tabs.Content value="avis">
                        <AvisTable />
                    </Tabs.Content>
                    <Tabs.Content value="outils">
                        <OutilsTable />
                    </Tabs.Content>
                    <Tabs.Content value="utilisateurs">
                        <UsersTable />
                    </Tabs.Content>
                    <Tabs.Content value="categories">
                        <CategoriesTable />
                    </Tabs.Content>
                </Tabs.Root>
            </Container>
        </main>
    );
}
