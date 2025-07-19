import { useState } from "react";
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
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCategories, createCategory, deleteCategory, addOutilToCategory, removeOutilFromCategory } from '@/services/CatégorieService';

export default function CategoriesTable() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<{ name: string; imageURL: string; description: string }>({ name: "", imageURL: "", description: "" });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [addOutilModal, setAddOutilModal] = useState<{ open: boolean; catId: string | null }>({ open: false, catId: null });
  const [outilIdToAdd, setOutilIdToAdd] = useState("");
  const [addOutilError, setAddOutilError] = useState<string | null>(null);
  const [removeOutilError, setRemoveOutilError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data: categories = [], isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const addOutilMutation = useMutation({
    mutationFn: ({ catId, outilId }: { catId: string, outilId: string }) => addOutilToCategory(catId, outilId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const removeOutilMutation = useMutation({
    mutationFn: ({ catId, outilsIds }: { catId: string, outilsIds: string[] }) => removeOutilFromCategory(catId, outilsIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    createMutation.mutate(form, {
      onSuccess: () => {
        setShowModal(false);
        setForm({ name: "", imageURL: "", description: "" });
      },
      onError: (err: any) => setSubmitError(err.message),
    });
  };

  const createDeleteHandler = (catId: string) => () => {
    deleteMutation.mutate(catId);
  };

  const handleAddOutil = () => {
    if (!addOutilModal.catId || !outilIdToAdd) return;
    setAddOutilError(null);
    addOutilMutation.mutate({ catId: addOutilModal.catId, outilId: outilIdToAdd }, {
      onSuccess: () => {
        setAddOutilModal({ open: false, catId: null });
        setOutilIdToAdd("");
      },
      onError: (err: any) => setAddOutilError(err.message),
    });
  };

  const createRemoveOutilHandler = (catId: string, outilId: string) => () => {
    setRemoveOutilError(null);
    const cat = categories.find((c: Categorie) => c._id === catId);
    if (!cat) {
      setRemoveOutilError("Catégorie non trouvée");
      return;
    }
    const newOutils = cat.outils.filter((o: any) => o._id !== outilId).map((o: any) => o._id);
    removeOutilMutation.mutate({ catId, outilsIds: newOutils }, {
      onError: (err: any) => setRemoveOutilError(err.message),
    });
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
              submitLoading={createMutation.isPending}
              submitError={submitError}
          >
            <Btn>+ Ajouter une catégorie</Btn>
          </EditModal>
        </div>
        {isLoading && <div>Chargement...</div>}
        {error && <div style={{ color: "red" }}>{(error as Error).message}</div>}
        {!isLoading && !error && (
            <div className={styles.tableContainer}>
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
                  {categories.map((cat: Categorie) => (
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
                                {cat.outils.map((outil: any) => (
                                    <Badge className={styles.badge} key={outil._id} color="blue" variant="soft">
                                      <AlertModal
                                          deleteLoading={removeOutilMutation.isPending}
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
                                  confirmLoading={addOutilMutation.isPending}
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
                              deleteLoading={deleteMutation.isPending}
                              deleteError={deleteMutation.error ? (deleteMutation.error as Error).message : null}
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
            </div>
        )}
      </Wrapper>
  );
}