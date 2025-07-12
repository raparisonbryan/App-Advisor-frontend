import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { User } from "@/types/User";
import styles from "./AdminTables.module.scss";
import H2 from "@/components/Atoms/Title/H2/H2";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import IconButton from "@/components/Atoms/Button/IconButton";
import DeleteIcon from "@/components/Atoms/Icons/DeleteIcon";
import EditIcon from "@/components/Atoms/Icons/EditIcon";

export default function UsersTable() {
  const [users, setUsers] = useState<(User & { _id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<{ name: string; email: string; Admin?: boolean }>({ name: "", email: "", Admin: false });
  const [editUser, setEditUser] = useState<(User & { _id: string }) | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) console.error("Erreur lors du chargement des utilisateurs");
      const data = await response.json();
      setUsers(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openEditModal = (user: User & { _id: string }) => {
    setEditUser(user);
    setForm({ name: user.name, email: user.email, Admin: !!user.Admin });
    setShowModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitLoading(true);
    setSubmitError(null);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${editUser?._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const data = await response.json();
        console.error(data.msg || "Erreur lors de la modification de l'utilisateur");
      }
      setShowModal(false);
      setEditUser(null);
      setForm({ name: "", email: "", Admin: false });
      fetchUsers();
    } catch (e: any) {
      setSubmitError(e.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteUserId) return;
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${deleteUserId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = await response.json();
        console.error(data.msg || "Erreur lors de la suppression de l'utilisateur");
      }
      setDeleteUserId(null);
      fetchUsers();
    } catch (e: any) {
      setDeleteError(e.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <Wrapper width="100%" gap="24px">
      <H2>Utilisateurs</H2>
      {loading && <div>Chargement...</div>}
      {error && <div className={styles.error}>{error}</div>}
      {!loading && !error && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.Admin ? "Oui" : "Non"}</td>
                <td>
                  <IconButton type="edit" ariaLabel="Éditer" onClick={() => openEditModal(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton type="delete" ariaLabel="Supprimer" onClick={() => setDeleteUserId(user._id)}>
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
            <H2>Éditer l'utilisateur</H2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input name="name" placeholder="Nom" value={form.name} onChange={handleChange} required />
              <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              <label className={styles.checkboxLabel}>
                <input type="checkbox" name="Admin" checked={!!form.Admin} onChange={handleChange} />
                Admin
              </label>
              {submitError && <div className={styles.error}>{submitError}</div>}
              <div className={styles.modalActions}>
                <button type="button" onClick={() => { setShowModal(false); setEditUser(null); }}>Annuler</button>
                <button type="submit" disabled={submitLoading}>
                  {submitLoading ? "Enregistrement..." : "Enregistrer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteUserId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <H2>Confirmer la suppression</H2>
            <p style={{ color: "var(--text-color)" }}>Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible.</p>
            {deleteError && <div className={styles.error}>{deleteError}</div>}
            <div className={styles.modalActions}>
              <button onClick={() => setDeleteUserId(null)}>Annuler</button>
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