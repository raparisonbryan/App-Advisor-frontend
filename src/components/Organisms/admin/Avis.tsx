import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Avis } from "@/types/Avis";
import styles from "./AdminTables.module.scss";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import H2 from "@/components/Atoms/Title/H2/H2";
import IconButton from "@/components/Atoms/Button/IconButton";
import DeleteIcon from "@/components/Atoms/Icons/DeleteIcon";

export default function AvisTable() {
  const [avis, setAvis] = useState<Avis[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteAvisId, setDeleteAvisId] = useState<string | null>(null);
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

  const handleDelete = async () => {
    if (!deleteAvisId) return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/avis/${deleteAvisId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        console.error(data.msg || "Erreur lors de la suppression de l'avis");
      }
      setDeleteAvisId(null);
      fetchAvis();
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
                  <IconButton type="delete" ariaLabel="Supprimer" onClick={() => setDeleteAvisId(a._id)}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {deleteAvisId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <H2>Confirmer la suppression</H2>
            <p style={{ color: "var(--text-color)" }}>Voulez-vous vraiment supprimer cet avis ? Cette action est irréversible.</p>
            {deleteError && <div className={styles.error}>{deleteError}</div>}
            <div className={styles.modalActions}>
              <button onClick={() => setDeleteAvisId(null)}>Annuler</button>
              <button onClick={handleDelete} disabled={deleteLoading} className={styles.deleteBtn}>
                {deleteLoading ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
} 