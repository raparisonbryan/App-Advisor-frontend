import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Avis } from "@/types/Avis";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import H2 from "@/components/Atoms/Title/H2/H2";
import { TrashIcon } from "@radix-ui/react-icons";
import { IconButton, Table, Text } from "@radix-ui/themes";
import AlertModal from "@/components/Molecules/AlertDialog/AlertModal";
import styles from "@/components/Organisms/admin/AdminTables.module.scss";

export default function AvisTable() {
  const [avis, setAvis] = useState<Avis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchAvis = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/avis`);
      if (!response.ok) console.error("Erreur lors du chargement des avis");
      const data = await response.json();
      setAvis(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvis();
  }, []);

  const createDeleteHandler = (avisId: string) => async () => {
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/avis/${avisId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        setDeleteError(data.msg || "Erreur lors de la suppression de l'avis");
      } else {
        fetchAvis();
      }
    } catch (e: any) {
      setDeleteError(e.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
      <Wrapper width="100%" gap="20px">
        <H2>Avis</H2>
        {loading && <div>Chargement...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!loading && !error && (
            <Table.Root variant="surface" size="3" className={styles.table}>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Message</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Outil</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Utilisateur</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {avis.map((a) => (
                    <Table.Row key={a._id} align="center">
                      <Table.Cell style={{ width: "40%" }}>
                        <Text>{a.message}</Text>
                      </Table.Cell>
                      <Table.Cell style={{ width: "15%" }}>
                        <Text>{a.outils?.name || "-"}</Text>
                      </Table.Cell>
                      <Table.Cell style={{ width: "15%" }}>
                        <Text>{a.user?.name || a.user?.email || "-"}</Text>
                      </Table.Cell>
                      <Table.Cell style={{ width: "10%" }}>
                        <AlertModal
                            deleteLoading={deleteLoading}
                            deleteError={deleteError}
                            handleDelete={createDeleteHandler(a._id)}
                        >
                          <IconButton color="red" variant="soft">
                            <TrashIcon />
                          </IconButton>
                        </AlertModal>
                      </Table.Cell>
                    </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
        )}
      </Wrapper>
  );
}