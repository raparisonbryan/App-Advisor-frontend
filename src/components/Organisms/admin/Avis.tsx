import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Avis } from "@/types/Avis";
import styles from "./AdminTables.module.scss";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import H2 from "@/components/Atoms/Title/H2/H2";
import { TrashIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import AlertModal from "@/components/Molecules/AlertDialog/AlertModal";

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
      <Wrapper width="100%" gap="24px">
        <H2>Avis</H2>
        {loading && <div>Chargement...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {!loading && !error && (
            <table className={styles.table}>
              <thead>
              <tr>
                <th>Message</th>
                <th>Outil</th>
                <th>Utilisateur</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {avis.map((a) => (
                  <tr key={a._id}>
                    <td>{a.message}</td>
                    <td>{a.outils?.name || "-"}</td>
                    <td>{a.user?.name || a.user?.email || "-"}</td>
                    <td>
                      <AlertModal
                          deleteLoading={deleteLoading}
                          deleteError={deleteError}
                          handleDelete={createDeleteHandler(a._id)}
                      >
                        <IconButton color="red" variant="soft">
                          <TrashIcon />
                        </IconButton>
                      </AlertModal>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        )}
      </Wrapper>
  );
}