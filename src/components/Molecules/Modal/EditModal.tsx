import { Dialog, Button, Flex, TextField, TextArea } from "@radix-ui/themes";

export interface EditModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    form: { name: string; description: string; imageURL: string };
    onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    submitLoading: boolean;
    submitError: string | null;
    isEdit?: boolean;
}

const EditModal = ({
                       children,
                       open,
                       onOpenChange,
                       title,
                       form,
                       onFormChange,
                       onSubmit,
                       submitLoading,
                       submitError,
                       isEdit = false
                   }: EditModalProps) => {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Trigger>
                {children}
            </Dialog.Trigger>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>{title}</Dialog.Title>
                <form onSubmit={onSubmit}>
                    <Flex direction="column" gap="3">
                        <Flex direction="column" gap="1">
                            <label htmlFor={form.name}>
                                Nom
                            </label>
                            <TextField.Root
                                name="name"
                                placeholder="Nom"
                                value={form.name}
                                onChange={onFormChange}
                                required
                            />
                        </Flex>
                        <Flex direction="column" gap="1">
                            <label htmlFor={form.description}>
                                Description
                            </label>
                            <TextArea
                                name="description"
                                placeholder="Description"
                                value={form.description}
                                onChange={onFormChange}
                                required
                            />
                        </Flex>
                        <Flex direction="column" gap="1">
                            <label htmlFor={form.imageURL}>
                                Url de l&#39;image
                            </label>
                            <TextField.Root
                                name="imageURL"
                                placeholder="Image URL"
                                value={form.imageURL}
                                onChange={onFormChange}
                                required
                            />
                        </Flex>
                        {submitError && <div style={{ color: 'red' }}>{submitError}</div>}
                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button variant="soft" color="gray" type="button">
                                    Annuler
                                </Button>
                            </Dialog.Close>
                            <Button type="submit" color="green" disabled={submitLoading}>
                                {submitLoading ? (isEdit ? "Enregistrement..." : "Ajout...") : (isEdit ? "Enregistrer" : "Ajouter")}
                            </Button>
                        </Flex>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default EditModal;