import { useState } from "react";
import { User } from "@/types/User";
import H2 from "@/components/Atoms/Title/H2/H2";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import { IconButton, Badge, Flex, Table } from "@radix-ui/themes";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import AlertModal from "@/components/Molecules/AlertDialog/AlertModal";
import UserModal from "@/components/Molecules/Modal/UserModal";
import styles from "@/components/Organisms/admin/AdminTables.module.scss";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, updateUser, deleteUser } from '@/services/AuthService';

export default function UsersTable() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<{ name: string; email: string; Admin?: boolean }>({ name: "", email: "", Admin: false });
  const [editUser, setEditUser] = useState<(User & { _id: string }) | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (editUser) {
      updateMutation.mutate({ id: editUser._id, user: form }, {
        onSuccess: () => {
          setShowModal(false);
          setEditUser(null);
          setForm({ name: "", email: "", Admin: false });
        },
        onError: (err: any) => setSubmitError(err.message),
      });
    }
  };

  const createDeleteHandler = (userId: string) => () => {
    deleteMutation.mutate(userId);
  };

  return (
      <Wrapper width="100%" gap="20px">
        <H2>Utilisateurs ({users.length})</H2>
        {isLoading && <div>Chargement...</div>}
        {error && <div style={{ color: "red" }}>{(error as Error).message}</div>}
        {!isLoading && !error && (
            <Table.Root variant="surface" size="3" className={styles.table}>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Nom</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Admin</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map((user: User & { _id: string }) => (
                    <Table.Row key={user._id} align="center">
                      <Table.Cell>{user.name}</Table.Cell>
                      <Table.Cell>{user.email}</Table.Cell>
                      <Table.Cell>
                        <Badge color={user.Admin ? "green" : "gray"} variant="soft">
                          {user.Admin ? "Oui" : "Non"}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
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
                              submitLoading={updateMutation.isPending}
                              submitError={submitError}
                          >
                            <IconButton color="cyan" variant="soft" onClick={() => openEditModal(user)}>
                              <Pencil1Icon />
                            </IconButton>
                          </UserModal>
                          <AlertModal
                              deleteLoading={deleteMutation.isPending}
                              deleteError={deleteMutation.error ? (deleteMutation.error as Error).message : null}
                              handleDelete={createDeleteHandler(user._id)}
                              title="Supprimer l'utilisateur"
                              description="Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible."
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