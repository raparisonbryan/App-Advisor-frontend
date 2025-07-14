import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Categorie } from "@/types/Categorie";
import Image from "next/image";
import styles from "./AdminTables.module.scss";
import H2 from "@/components/Atoms/Title/H2/H2";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import { TrashIcon, PlusIcon } from "@radix-ui/react-icons";
import { IconButton, Button, Badge, Flex, Box, Text, Table } from "@radix-ui/themes";
import AlertModal from "@/components/Molecules/AlertDialog/AlertModal";
import EditModal from "@/components/Molecules/Modal/EditModal";
import CategoryModal from "@/components/Molecules/Modal/CategoryModal";
import Btn from "@/components/Atoms/Button/Btn";

export default function CategoriesTable() {
  const [categories, setCategories] = useState<Categorie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<{ name: string; imageURL: string; description: string }>({ name: "", imageURL: "", description: "" });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [addOutilModal, setAddOutilModal] = useState<{ open: boolean; catId: string | null }>({ open: false, catId: null });
  const [outilIdToAdd, setOutilIdToAdd] = useState("");
  const [addOutilLoading, setAddOutilLoading] = useState(false);
  const [addOutilError, setAddOutilError] = useState<string | null>(null);
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
        setSubmitError(data.msg || "Erreur lors de l'ajout de la catégorie");
      } else {
        setShowModal(false);
        setForm({ name: "", imageURL: "", description: "" });
        fetchCategories();
      }
    } catch (e: any) {
      setSubmitError(e.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const createDeleteHandler = (catId: string) => async () => {
    setDeleteLoading(true);
    setDeleteError(null);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${catId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const data = await response.json();
        setDeleteError(data.msg || "Erreur lors de la suppression de la catégorie");
      } else {
        fetchCategories();
      }
    } catch (e: any) {
      setDeleteError(e.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleAddOutil = async () => {
    if (!addOutilModal.catId || !outilIdToAdd) return;
    setAddOutilLoading(true);
    setAddOutilError(null);
    try {
      const token = Cookies.get("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${addOutilModal.catId}/outils`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ outils: [outilIdToAdd] }),
      });
      if (!response.ok) {
        const data = await response.json();
        setAddOutilError(data.msg || "Erreur lors de l'ajout de l'outil à la catégorie");
      } else {
        setAddOutilModal({ open: false, catId: null });
        setOutilIdToAdd("");
        fetchCategories();
      }
    } catch (e: any) {
      setAddOutilError(e.message);
    } finally {
      setAddOutilLoading(false);
    }
  };

  const createRemoveOutilHandler = (catId: string, outilId: string) => async () => {
    setRemoveOutilLoading(true);
    setRemoveOutilError(null);
    try {
      const token = Cookies.get("token");
      const cat = categories.find(c => c._id === catId);
      if (!cat) {
        setRemoveOutilError("Catégorie non trouvée");
        return;
      }
      const newOutils = cat.outils.filter(o => o._id !== outilId).map(o => o._id);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${catId}/outils`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ outils: newOutils }),
      });
      if (!response.ok) {
        const data = await response.json();
        setRemoveOutilError(data.msg || "Erreur lors de la suppression de l'outil de la catégorie");
      } else {
        fetchCategories();
      }
    } catch (e: any) {
      setRemoveOutilError(e.message);
    } finally {
      setRemoveOutilLoading(false);
    }
  };

  return (
      <Wrapper width="100%" gap="20px">
        <div className={styles.headerRow}>
          <H2>Catégories</H2>
          <EditModal
              open={showModal}
              onOpenChange={setShowModal}
              title="Ajouter une catégorie"
              form={form}
              onFormChange={handleChange}
              onSubmit={handleSubmit}
              submitLoading={submitLoading}
              submitError={submitError}
          >
            <Btn>+ Ajouter une catégorie</Btn>
          </EditModal>
        </div>
        {loading && <div>Chargement...</div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
        {!loading && !error && (
            <Table.Root variant="surface" size="3" className={styles.table}>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Nom</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Outils</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {categories.map((cat) => (
                    <Table.Row key={cat._id} align="center">
                      <Table.Cell>
                        <Text weight="medium">{cat.name}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Image
                            width={60}
                            height={40}
                            src={cat.imageURL}
                            alt={cat.name}
                            style={{ objectFit: "contain", borderRadius: "6px" }}
                        />
                      </Table.Cell>
                      <Table.Cell>
                        <Box style={{ minWidth: "200px", maxWidth: "400px" }}>
                          <Flex direction="column" gap="2" align="start">
                            <Flex wrap="wrap" gap="1">
                              {cat.outils.map((outil) => (
                                  <Badge className={styles.badge} key={outil._id} color="blue" variant="soft">
                                    <AlertModal
                                        deleteLoading={removeOutilLoading}
                                        deleteError={removeOutilError}
                                        handleDelete={createRemoveOutilHandler(cat._id, outil._id)}
                                        title="Retirer l'outil"
                                        description="Voulez-vous vraiment retirer cet outil de la catégorie ?"
                                    >
                                      <Text size="1">{outil.name}</Text>
                                    </AlertModal>
                                  </Badge>
                              ))}
                              {cat.outils.length === 0 && (
                                  <Text size="1" color="gray">Aucun outil</Text>
                              )}
                            </Flex>
                            <CategoryModal
                                open={addOutilModal.open && addOutilModal.catId === cat._id}
                                onOpenChange={(open) => setAddOutilModal({ open, catId: open ? cat._id : null })}
                                title="Ajouter un outil à la catégorie"
                                showInput={true}
                                inputValue={outilIdToAdd}
                                onInputChange={setOutilIdToAdd}
                                inputPlaceholder="ID de l'outil à ajouter"
                                onConfirm={handleAddOutil}
                                confirmLoading={addOutilLoading}
                                confirmError={addOutilError}
                                confirmText="Ajouter"
                            >
                              <Button size="1" variant="soft" color="green">
                                <PlusIcon width="12" height="12" />
                                Ajouter un outil
                              </Button>
                            </CategoryModal>
                          </Flex>
                        </Box>
                      </Table.Cell>
                      <Table.Cell>
                        <AlertModal
                            deleteLoading={deleteLoading}
                            deleteError={deleteError}
                            handleDelete={createDeleteHandler(cat._id)}
                            title="Supprimer la catégorie"
                            description="Voulez-vous vraiment supprimer cette catégorie ? Cette action est irréversible."
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