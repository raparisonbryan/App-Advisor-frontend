import { Dialog, Button, Flex, TextField } from "@radix-ui/themes";
import ModalBtn from "@/components/Atoms/Button/ModalBtn";

export interface CategoryModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    inputValue?: string;
    onInputChange?: (value: string) => void;
    inputPlaceholder?: string;
    onConfirm: () => void;
    confirmLoading: boolean;
    confirmError: string | null;
    confirmText?: string;
    showInput?: boolean;
}

const CategoryModal = ({
                         children,
                         open,
                         onOpenChange,
                         title,
                         description,
                         inputValue,
                         onInputChange,
                         inputPlaceholder,
                         onConfirm,
                         confirmLoading,
                         confirmError,
                         confirmText = "Confirmer",
                         showInput = false
                     }: CategoryModalProps) => {
    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Trigger>
                {children}
            </Dialog.Trigger>
            <Dialog.Content style={{ maxWidth: 450 }}>
                <Dialog.Title>{title}</Dialog.Title>
                {description && (
                    <Dialog.Description size="2">
                        {description}
                    </Dialog.Description>
                )}
                <Flex direction="column" gap="3">
                    {showInput && (
                        <TextField.Root
                            placeholder={inputPlaceholder}
                            value={inputValue || ""}
                            onChange={(e) => onInputChange?.(e.target.value)}
                        />
                    )}
                    {confirmError && <div style={{ color: 'red' }}>{confirmError}</div>}
                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray" type="button">
                                Annuler
                            </Button>
                        </Dialog.Close>
                        <ModalBtn  onClick={onConfirm} disabled={confirmLoading}>
                            {confirmLoading ? "En cours..." : confirmText}
                        </ModalBtn>
                    </Flex>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default CategoryModal;