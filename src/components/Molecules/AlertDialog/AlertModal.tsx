import { Button, Flex, AlertDialog } from "@radix-ui/themes";

export interface AlertModalProps {
    children: React.ReactNode;
    deleteLoading: boolean;
    deleteError: string | null;
    handleDelete: () => void;
    title?: string;
    description?: string;
}

const AlertModal = ({
                        children,
                        deleteLoading,
                        deleteError,
                        handleDelete,
                        title = "Confirmer la suppression",
                        description = "Voulez-vous vraiment supprimer cet élément ? Cette action est irréversible."
                    }: AlertModalProps) => {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                {children}
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{ maxWidth: 450 }}>
                <AlertDialog.Title>{title}</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    {description}
                </AlertDialog.Description>
                {deleteError && <div style={{ color: 'red', marginTop: '8px' }}>{deleteError}</div>}
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Annuler
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button variant="solid" color="red" onClick={handleDelete} disabled={deleteLoading}>
                            {deleteLoading ? "Suppression..." : "Supprimer"}
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
};

export default AlertModal;