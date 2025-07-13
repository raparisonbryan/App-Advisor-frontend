import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Outil } from "@/types/Outil";
import Image from "next/image";
import styles from "./AdminTables.module.scss";
import H2 from "@/components/Atoms/Title/H2/H2";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import {IconButton, Flex} from "@radix-ui/themes";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import AlertModal from "@/components/Molecules/AlertDialog/AlertModal";
import EditModal from "@/components/Molecules/Modal/EditModal";
import Btn from "@/components/Atoms/Button/Btn";

export default function OutilsTable() {
  const [outils, setOutils] = useState<Outil[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", imageURL: "" });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [editOutil, setEditOutil] = useState<Outil | null>(null);
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

  const openAddModal = () => {
    setEditOutil(null);
    setForm({ name: "", description: "", imageURL: "" });
    setShowModal(true);
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
        setSubmitError(data.msg || "Erreur lors de l'enregistrement de l'outil");
      } else {
        setShowModal(false);
        setForm({ name: "", description: "", imageURL: "" });
        setEditOutil(null);
        fetchOutils();
      }
    } catch (e: any) {
      setSubmitError(e.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const createDeleteHandler = (outilId: string) => async () => {
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/outils/${outilId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const data = await response.json();
        setDeleteError(data.msg || "Erreur lors de la suppression de l'outil");
      } else {
        fetchOutils();
      }
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
          <EditModal
              open={showModal}
              onOpenChange={setShowModal}
              title={editOutil ? "Éditer l'outil" : "Ajouter un outil"}
              form={form}
              onFormChange={handleChange}
              onSubmit={handleSubmit}
              submitLoading={submitLoading}
              submitError={submitError}
              isEdit={!!editOutil}
          >
            <Btn onClick={openAddModal}>+ Ajouter un outil</Btn>
          </EditModal>
        </div>
        {loading && <div>Chargement...</div>}
        {error && <div className={styles.error}>{error}</div>}
        {!loading && !error && (
            <table className={styles.table}>
              <thead>
              <tr>
                <th>Nom</th>
                <th>Image</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
              </thead>
              <tbody>
              {outils.map((outil) => (
                  <tr key={outil._id}>
                    <td>{outil.name}</td>
                    <td>
                      <Image
                          width={60}
                          height={40}
                          src={outil.imageURL}
                          alt={outil.name}
                          style={{ objectFit: "contain", borderRadius: 6 }}
                      />
                    </td>
                    <td>{outil.description}</td>
                    <td>
                      <Flex direction="column" gap="5px">
                        <IconButton color="cyan" variant="soft" onClick={() => openEditModal(outil)}>
                          <Pencil1Icon />
                        </IconButton>
                        <AlertModal
                            deleteLoading={deleteLoading}
                            deleteError={deleteError}
                            handleDelete={createDeleteHandler(outil._id)}
                            title="Supprimer l'outil"
                            description="Voulez-vous vraiment supprimer cet outil ? Cette action est irréversible."
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