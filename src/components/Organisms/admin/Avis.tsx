import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import H2 from "@/components/Atoms/Title/H2/H2";
import { TrashIcon } from "@radix-ui/react-icons";
import { IconButton, Table, Text } from "@radix-ui/themes";
import AlertModal from "@/components/Molecules/AlertDialog/AlertModal";
import styles from "@/components/Organisms/admin/AdminTables.module.scss";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAvis, deleteAvis } from '@/services/AvisService';

export default function AvisTable() {
  const queryClient = useQueryClient();
  const { data: avis = [], isLoading, error } = useQuery({
    queryKey: ['avis'],
    queryFn: fetchAvis,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAvis,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['avis'] });
    },
  });

  const createDeleteHandler = (avisId: string) => () => {
    deleteMutation.mutate(avisId);
  };

  return (
      <Wrapper width="100%" gap="20px">
        <H2>Avis</H2>
        {isLoading && <div>Chargement...</div>}
        {error && <div style={{ color: "red" }}>{(error as Error).message}</div>}
        {!isLoading && !error && (
            <Table.Root variant="surface" size="3" className={styles.table}>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Message</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Outil</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Utilisateur</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {avis.map((a) => (
                    <Table.Row key={a._id} align="center">
                      <Table.Cell style={{ width: "40%" }}>
                        <Text>{a.message}</Text>
                      </Table.Cell>
                      <Table.Cell style={{ width: "15%" }}>
                        <Text>{a.outils?.name || "-"}</Text>
                      </Table.Cell>
                      <Table.Cell style={{ width: "15%" }}>
                        <Text>{a.user?.name || a.user?.email || "-"}</Text>
                      </Table.Cell>
                      <Table.Cell style={{ width: "10%" }}>
                        <AlertModal
                            deleteLoading={deleteMutation.isPending}
                            deleteError={deleteMutation.error ? (deleteMutation.error as Error).message : null}
                            handleDelete={createDeleteHandler(a._id)}
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