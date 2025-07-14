import { Dialog, Button, Flex, TextField, Switch, Text } from "@radix-ui/themes";
import ModalBtn from "@/components/Atoms/Button/ModalBtn";

export interface UserModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    form: { name: string; email: string; Admin?: boolean };
    onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
    submitLoading: boolean;
    submitError: string | null;
}

const UserModal = ({
                           children,
                           open,
                           onOpenChange,
                           title,
                           form,
                           onFormChange,
                           onSubmit,
                           submitLoading,
                           submitError
                       }: UserModalProps) => {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Trigger>
                {children}
            </Dialog.Trigger>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>{title}</Dialog.Title>
                <form onSubmit={onSubmit}>
                    <Flex direction="column" gap="3">
                        <TextField.Root
                            name="name"
                            placeholder="Nom"
                            value={form.name}
                            onChange={onFormChange}
                            required
                        />
                        <TextField.Root
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={onFormChange}
                            required
                        />
                        <Flex align="center" gap="2">
                            <Switch
                                name="Admin"
                                checked={!!form.Admin}
                                onCheckedChange={(checked) => {
                                    const event = {
                                        target: {
                                            name: "Admin",
                                            type: "checkbox",
                                            checked,
                                            value: checked.toString()
                                        }
                                    } as React.ChangeEvent<HTMLInputElement>;
                                    onFormChange(event);
                                }}
                            />
                            <Text size="2">Administrateur</Text>
                        </Flex>
                        {submitError && <div style={{ color: 'red' }}>{submitError}</div>}
                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button variant="soft" color="gray" type="button">
                                    Annuler
                                </Button>
                            </Dialog.Close>
                            <ModalBtn type="submit" disabled={submitLoading}>
                                {submitLoading ? "Enregistrement..." : "Enregistrer"}
                            </ModalBtn>
                        </Flex>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default UserModal;