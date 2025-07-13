import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { User } from "@/types/User";
import styles from "./AdminTables.module.scss";
import H2 from "@/components/Atoms/Title/H2/H2";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import {IconButton, Badge, Flex} from "@radix-ui/themes";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import AlertModal from "@/components/Molecules/AlertDialog/AlertModal";
import UserModal from "@/components/Molecules/Modal/UserModal";

export default function UsersTable() {
  const [users, setUsers] = useState<(User & { _id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<{ name: string; email: string; Admin?: boolean }>({ name: "", email: "", Admin: false });
  const [editUser, setEditUser] = useState<(User & { _id: string }) | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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
        setSubmitError(data.msg || "Erreur lors de la modification de l'utilisateur");
      } else {
        setShowModal(false);
        setEditUser(null);
        setForm({ name: "", email: "", Admin: false });
        fetchUsers();
      }
    } catch (e: any) {
      setSubmitError(e.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const createDeleteHandler = (userId: string) => async () => {
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = await response.json();
        setDeleteError(data.msg || "Erreur lors de la suppression de l'utilisateur");
      } else {
        fetchUsers();
      }
    } catch (e: any) {
      setDeleteError(e.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
      <Wrapper width="100%" gap="24px">
        <H2>Utilisateurs ({users.length})</H2>
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
                    <td>
                      <Badge color={user.Admin ? "green" : "gray"} variant="soft">
                        {user.Admin ? "Oui" : "Non"}
                      </Badge>
                    </td>
                    <td>
                      <Flex gap="5px">
                        <UserModal
                            open={showModal && editUser?._id === user._id}
                            onOpenChange={(open) => {
                              setShowModal(open);
                              if (!open) {
                                setEditUser(null);
                                setForm({ name: "", email: "", Admin: false });
                              }
                            }}
                            title="Éditer l'utilisateur"
                            form={form}
                            onFormChange={handleChange}
                            onSubmit={handleSubmit}
                            submitLoading={submitLoading}
                            submitError={submitError}
                        >
                          <IconButton color="cyan" variant="soft" onClick={() => openEditModal(user)}>
                            <Pencil1Icon />
                          </IconButton>
                        </UserModal>
                        <AlertModal
                            deleteLoading={deleteLoading}
                            deleteError={deleteError}
                            handleDelete={createDeleteHandler(user._id)}
                            title="Supprimer l'utilisateur"
                            description="Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible."
                        >
                          <IconButton color="red" variant="soft">
                            <TrashIcon />
                          </IconButton>
                        </AlertModal>
                      </Flex>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
        )}
      </Wrapper>
  );
}