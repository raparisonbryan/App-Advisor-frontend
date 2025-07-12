import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Outil } from "@/types/Outil";
import Image from "next/image";
import styles from "./AdminTables.module.scss";
import H2 from "@/components/Atoms/Title/H2/H2";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import IconButton from "@/components/Atoms/Button/IconButton";
import DeleteIcon from "@/components/Atoms/Icons/DeleteIcon";
import EditIcon from "@/components/Atoms/Icons/EditIcon";

export default function OutilsTable() {
  const [outils, setOutils] = useState<Outil[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", imageURL: "" });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [editOutil, setEditOutil] = useState<Outil | null>(null);
  const [deleteOutilId, setDeleteOutilId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchOutils = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/outils`);
      if (!response.ok) console.error("Erreur lors du chargement des outils");
      const data = await response.json();
      setOutils(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOutils();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openEditModal = (outil: Outil) => {
    setEditOutil(outil);
    setForm({ name: outil.name, description: outil.description, imageURL: outil.imageURL });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);
    try {
      const token = Cookies.get("token");
      let response;
      if (editOutil) {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/outils/${editOutil._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
      } else {
        response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/outils`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        });
      }
      if (!response.ok) {
        const data = await response.json();
        console.error(data.msg || "Erreur lors de l'enregistrement de l'outil");
      }
      setShowModal(false);
      setForm({ name: "", description: "", imageURL: "" });
      setEditOutil(null);
      fetchOutils();
    } catch (e: any) {
      setSubmitError(e.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteOutilId) return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/outils/${deleteOutilId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        console.error(data.msg || "Erreur lors de la suppression de l'outil");
      }
      setDeleteOutilId(null);
      fetchOutils();
    } catch (e: any) {
      setDeleteError(e.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Wrapper width="100%" gap="24px">
      <div className={styles.headerRow}>
        <H2>Outils</H2>
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>+ Ajouter un outil</button>
      </div>
      {loading && <div>Chargement...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {!loading && !error && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {outils.map((outil) => (
              <tr key={outil._id}>
                <td>{outil.name}</td>
                <td>{outil.description}</td>
                <td>
                  <Image width={60} height={40} src={outil.imageURL} alt={outil.name} style={{ objectFit: "contain", borderRadius: 6 }} />
                </td>
                <td>
                  <IconButton type="edit" ariaLabel="Éditer" onClick={() => openEditModal(outil)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton type="delete" ariaLabel="Supprimer" onClick={() => setDeleteOutilId(outil._id)}>
                    <DeleteIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <H2>{editOutil ? "Éditer l'outil" : "Ajouter un outil"}</H2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
              <input name="imageURL" placeholder="Image URL" value={form.imageURL} onChange={handleChange} required />
              {submitError && <div className={styles.error}>{submitError}</div>}
              <div className={styles.modalActions}>
                <button type="button" onClick={() => { setShowModal(false); setEditOutil(null); }}>Annuler</button>
                <button type="submit" disabled={submitLoading}>
                  {submitLoading ? (editOutil ? "Enregistrement..." : "Ajout...") : (editOutil ? "Enregistrer" : "Ajouter")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteOutilId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <H2>Confirmer la suppression</H2>
            <p style={{ color: "var(--text-color)" }}>Voulez-vous vraiment supprimer cet outil ? Cette action est irréversible.</p>
            {deleteError && <div className={styles.error}>{deleteError}</div>}
            <div className={styles.modalActions}>
              <button onClick={() => setDeleteOutilId(null)}>Annuler</button>
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