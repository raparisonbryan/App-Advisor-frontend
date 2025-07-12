import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Categorie } from "@/types/Categorie";
import Image from "next/image";
import styles from "./AdminTables.module.scss";
import H2 from "@/components/Atoms/Title/H2/H2";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import IconButton from "@/components/Atoms/Button/IconButton";
import DeleteIcon from "@/components/Atoms/Icons/DeleteIcon";

export default function CategoriesTable() {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<{ name: string; imageURL: string; description: string }>({ name: "", imageURL: "", description: "" });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deleteCatId, setDeleteCatId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [addOutilCatId, setAddOutilCatId] = useState<string | null>(null);
  const [outilIdToAdd, setOutilIdToAdd] = useState("");
  const [addOutilLoading, setAddOutilLoading] = useState(false);
  const [addOutilError, setAddOutilError] = useState<string | null>(null);
  const [removeOutilCatId, setRemoveOutilCatId] = useState<string | null>(null);
  const [outilIdToRemove, setOutilIdToRemove] = useState<string | null>(null);
  const [removeOutilLoading, setRemoveOutilLoading] = useState(false);
  const [removeOutilError, setRemoveOutilError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      if (!response.ok) console.error("Erreur lors du chargement des catégories");
      const data = await response.json();
      setCategories(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await response.json();
        console.error(data.msg || "Erreur lors de l'ajout de la catégorie");
      }
      setShowModal(false);
      setForm({ name: "", imageURL: "", description: "" });
      fetchCategories();
    } catch (e: any) {
      setSubmitError(e.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteCatId) return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${deleteCatId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = await response.json();
        console.error(data.msg || "Erreur lors de la suppression de la catégorie");
      }
      setDeleteCatId(null);
      fetchCategories();
    } catch (e: any) {
      setDeleteError(e.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleAddOutil = async () => {
    if (!addOutilCatId || !outilIdToAdd) return;
    setAddOutilLoading(true);
    setAddOutilError(null);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${addOutilCatId}/outils`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ outils: [outilIdToAdd] }),
      });
      if (!response.ok) {
        const data = await response.json();
        console.error(data.msg || "Erreur lors de l'ajout de l'outil à la catégorie");
      }
      setAddOutilCatId(null);
      setOutilIdToAdd("");
      fetchCategories();
    } catch (e: any) {
      setAddOutilError(e.message);
    } finally {
      setAddOutilLoading(false);
    }
  };

  const handleRemoveOutil = async () => {
    if (!removeOutilCatId || !outilIdToRemove) return;
    setRemoveOutilLoading(true);
    setRemoveOutilError(null);
    try {
      const token = Cookies.get("token");
      const cat = categories.find(c => c._id === removeOutilCatId);
      if (!cat) console.error("Catégorie non trouvée");
      // @ts-ignore
      const newOutils = cat.outils.filter(o => o._id !== outilIdToRemove).map(o => o._id);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${removeOutilCatId}/outils`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ outils: newOutils }),
      });
      if (!response.ok) {
        const data = await response.json();
        console.error(data.msg || "Erreur lors de la suppression de l'outil de la catégorie");
      }
      setRemoveOutilCatId(null);
      setOutilIdToRemove(null);
      fetchCategories();
    } catch (e: any) {
      setRemoveOutilError(e.message);
    } finally {
      setRemoveOutilLoading(false);
    }
  };

  return (
    <Wrapper width="100%" gap="24px">
      <div className={styles.headerRow}>
        <H2>Catégories</H2>
        <button className={styles.addBtn} onClick={() => setShowModal(true)}>+ Ajouter une catégorie</button>
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
              <th>Outils</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td>{cat.name}</td>
                <td>{cat.description}</td>
                <td><Image width={60} height={40} src={cat.imageURL} alt={cat.name} style={{ objectFit: "contain" }} /></td>
                <td>
                  <ul>
                    {cat.outils.map((outil) => (
                      <li key={outil._id} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {outil.name}
                        <IconButton type="delete" ariaLabel="Retirer l'outil" onClick={() => { setRemoveOutilCatId(cat._id); setOutilIdToRemove(outil._id); }}>
                          <DeleteIcon />
                        </IconButton>
                      </li>
                    ))}
                  </ul>
                  <button className={styles.addBtn} style={{ fontSize: 12, marginTop: 4 }} onClick={() => setAddOutilCatId(cat._id)}>+ Ajouter un outil</button>
                </td>
                <td>
                  <IconButton type="delete" ariaLabel="Supprimer" onClick={() => setDeleteCatId(cat._id)}>
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
            <H2>Ajouter une catégorie</H2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
              <input name="imageURL" placeholder="Image URL" value={form.imageURL} onChange={handleChange} required />
              {submitError && <div className={styles.error}>{submitError}</div>}
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowModal(false)}>Annuler</button>
                <button type="submit" disabled={submitLoading}>
                  {submitLoading ? "Ajout..." : "Ajouter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteCatId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <H2>Confirmer la suppression</H2>
            <p style={{ color: "var(--text-color)" }}>Voulez-vous vraiment supprimer cette catégorie ? Cette action est irréversible.</p>
            {deleteError && <div className={styles.error}>{deleteError}</div>}
            <div className={styles.modalActions}>
              <button onClick={() => setDeleteCatId(null)}>Annuler</button>
              <button onClick={handleDelete} disabled={deleteLoading} className={styles.deleteBtn}>
                {deleteLoading ? "Suppression..." : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
      {addOutilCatId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <H2>Ajouter un outil à la catégorie</H2>
            <input placeholder="ID de l'outil à ajouter" value={outilIdToAdd} onChange={e => setOutilIdToAdd(e.target.value)} />
            {addOutilError && <div className={styles.error}>{addOutilError}</div>}
            <div className={styles.modalActions}>
              <button onClick={() => { setAddOutilCatId(null); setOutilIdToAdd(""); }}>Annuler</button>
              <button onClick={handleAddOutil} disabled={addOutilLoading} className={styles.addBtn}>
                {addOutilLoading ? "Ajout..." : "Ajouter"}
              </button>
            </div>
          </div>
        </div>
      )}
      {removeOutilCatId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <H2>Confirmer la suppression</H2>
            <p style={{ color: "var(--text-color)" }}>Voulez-vous vraiment retirer cet outil de la catégorie ?</p>
            {removeOutilError && <div className={styles.error}>{removeOutilError}</div>}
            <div className={styles.modalActions}>
              <button onClick={() => { setRemoveOutilCatId(null); setOutilIdToRemove(null); }}>Annuler</button>
              <button onClick={handleRemoveOutil} disabled={removeOutilLoading} className={styles.deleteBtn}>
                {removeOutilLoading ? "Suppression..." : "Retirer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
} 