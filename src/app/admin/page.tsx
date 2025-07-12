"use client"
import { Tabs } from "antd";
import "antd/dist/reset.css";
import OutilsTable from "@/components/Organisms/admin/Outils";
import AvisTable from "@/components/Organisms/admin/Avis";
import UsersTable from "@/components/Organisms/admin/Users";
import CategoriesTable from "@/components/Organisms/admin/Categories";
import styles from "./page.module.scss";
import Container from "@/components/Atoms/Container/Container";
import H1 from "@/components/Atoms/Title/H1/H1";

export default function AdminDashboard() {
  return (
      <main className={styles.main}>
          <Container flexDirection="column" alignItems="center" gap="50px" paddingTop="100px">
              <H1>Dashboard Admin</H1>
              <Tabs
                className={styles.tab}
                defaultActiveKey="1"
                items={[
                  { key: "1", label: "Avis", children: <AvisTable /> },
                  { key: "2", label: "Outils", children: <OutilsTable /> },
                  { key: "3", label: "Utilisateurs", children: <UsersTable /> },
                  { key: "4", label: "Catégories", children: <CategoriesTable /> },
                ]}
              />
          </Container>
      </main>
  );
}
