import { useState } from "react";
import { Outil } from "@/types/Outil";
import Image from "next/image";
import styles from "./AdminTables.module.scss";
import H2 from "@/components/Atoms/Title/H2/H2";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import {IconButton, Flex, Table} from "@radix-ui/themes";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import AlertModal from "@/components/Molecules/AlertDialog/AlertModal";
import EditModal from "@/components/Molecules/Modal/EditModal";
import Btn from "@/components/Atoms/Button/Btn";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getOutils, createOutil, updateOutil, deleteOutil } from '@/services/OutilService';

export default function OutilsTable() {
  const queryClient = useQueryClient();
  const { data: outils = [], isLoading, error } = useQuery({
    queryKey: ['outils'],
    queryFn: getOutils,
  });

  const createMutation = useMutation({
    mutationFn: createOutil,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['outils'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: { name: string; description: string; imageURL: string } }) => updateOutil(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['outils'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOutil,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['outils'] });
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", description: "", imageURL: "" });
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [editOutil, setEditOutil] = useState<Outil | null>(null);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (editOutil) {
      updateMutation.mutate({ id: editOutil._id, data: form }, {
        onSuccess: () => {
          setShowModal(false);
          setEditOutil(null);
          setForm({ name: "", description: "", imageURL: "" });
        },
        onError: (err: any) => setSubmitError(err.message),
      });
    } else {
      createMutation.mutate(form, {
        onSuccess: () => {
          setShowModal(false);
          setForm({ name: "", description: "", imageURL: "" });
        },
        onError: (err: any) => setSubmitError(err.message),
      });
    }
  };

  const createDeleteHandler = (outilId: string) => () => {
    deleteMutation.mutate(outilId);
  };

  return (
      <Wrapper width="100%" gap="20px">
        <div className={styles.headerRow}>
          <H2>Outils</H2>
          <EditModal
              open={showModal}
              onOpenChange={setShowModal}
              title={editOutil ? "Éditer l'outil" : "Ajouter un outil"}
              form={form}
              onFormChange={handleChange}
              onSubmit={handleSubmit}
              submitLoading={createMutation.isPending || updateMutation.isPending}
              submitError={submitError}
              isEdit={!!editOutil}
          >
            <Btn onClick={openAddModal}>+ Ajouter un outil</Btn>
          </EditModal>
        </div>
        {isLoading && <div>Chargement...</div>}
        {error && <div style={{ color: "red" }}>{(error as Error).message}</div>}
        {!isLoading && !error && (
            <Table.Root variant="surface" size="3" className={styles.table}>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Nom</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {outils.map((outil) => (
                    <Table.Row key={outil._id} align="center">
                      <Table.Cell style={{ width: "15%" }}>
                        {outil.name}
                      </Table.Cell>
                      <Table.Cell style={{ width: "15%" }}>
                        <Image
                            width={60}
                            height={40}
                            src={outil.imageURL}
                            alt={outil.name}
                            style={{ objectFit: "contain", borderRadius: 6 }}
                        />
                      </Table.Cell >
                      <Table.Cell style={{ width: "60%" }}>
                        {outil.description}
                      </Table.Cell>
                      <Table.Cell style={{ width: "10%" }}>
                        <Flex direction="column" gap="5px">
                          <IconButton color="cyan" variant="soft" onClick={() => openEditModal(outil)}>
                            <Pencil1Icon />
                          </IconButton>
                          <AlertModal
                              deleteLoading={deleteMutation.isPending}
                              deleteError={deleteMutation.error ? (deleteMutation.error as Error).message : null}
                              handleDelete={createDeleteHandler(outil._id)}
                              title="Supprimer l'outil"
                              description="Voulez-vous vraiment supprimer cet outil ? Cette action est irréversible."
                          >
                            <IconButton color="red" variant="soft">
                              <TrashIcon />
                            </IconButton>
                          </AlertModal>
                        </Flex>
                      </Table.Cell>
                    </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
        )}
      </Wrapper>
  );
}