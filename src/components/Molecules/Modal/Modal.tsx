import React, { useState } from 'react';
import { Dialog, Button, Flex } from "@radix-ui/themes";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import TextArea from "@/components/Atoms/Input/TextArea";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import InputRange from "@/components/Atoms/Input/InputRange";
import H3 from "@/components/Atoms/Title/H3/H3";
import Cookies from 'js-cookie';
import Btn from "@/components/Atoms/Button/Btn";
import { useRouter } from "next/navigation";
import P from "@/components/Atoms/Paragraph/P";
import ModalBtn from "@/components/Atoms/Button/ModalBtn";

interface ModalProps {
    children: React.ReactNode;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    outilId: string;
}

const Modal = ({ children, open, onOpenChange, outilId }: ModalProps) => {
    const [message, setMessage] = useState('');
    const [difficulty, setDifficulty] = useState(10);
    const [performance, setPerformance] = useState(10);
    const [flexibility, setFlexibility] = useState(10);
    const [note, setNote] = useState(10);
    const [submitLoading, setSubmitLoading] = useState(false);

    const token = Cookies.get('token');
    const router = useRouter();

    const resetForm = () => {
        setMessage('');
        setDifficulty(10);
        setPerformance(10);
        setFlexibility(10);
        setNote(10);
    };

    const handleSliderChange = (name: string, newValue: number) => {
        switch (name) {
            case 'difficulty':
                setDifficulty(newValue);
                break;
            case 'performance':
                setPerformance(newValue);
                break;
            case 'flexibility':
                setFlexibility(newValue);
                break;
            case 'note':
                setNote(newValue);
                break;
            default:
                console.log(`Invalid Slider Name: ${name}`);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitLoading(true);

        if (!token) {
            console.error("L'utilisateur n'est pas authentifié.");
            setSubmitLoading(false);
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/avis/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    outilId,
                    message,
                    difficulte: difficulty,
                    performance,
                    flexibilite: flexibility,
                    note
                })
            });

            if (!response.ok) {
                console.error('Erreur lors de la soumission de l\'avis');
            } else {
                console.log("Avis soumis avec succès!");
                resetForm();
                onOpenChange(false);
                window.location.reload();
            }
        } catch (error) {
            console.error("Erreur lors de la soumission de l'avis:", error);
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <Dialog.Root open={open} onOpenChange={(isOpen) => {
            onOpenChange(isOpen);
            if (!isOpen) resetForm();
        }}>
            <Dialog.Trigger>
                {children}
            </Dialog.Trigger>
            <Dialog.Content style={{ maxWidth: 700 }}>
                <Dialog.Title>
                    <P>Donner un avis</P>
                </Dialog.Title>

                {token ? (
                    <form onSubmit={handleSubmit}>
                        <Wrapper width="100%" gap="20px">
                            <TextArea
                                message={message}
                                placeholder="Partagez votre expérience avec cet outil..."
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <WrapperRow justifyContent="space-between" gap="20px">
                                <Wrapper width="50%" gap="20px">
                                    <Wrapper width="100%" gap="10px">
                                        <InputRange
                                            label="Difficulté"
                                            id="difficulty"
                                            value={difficulty}
                                            onChange={(e) => handleSliderChange('difficulty', parseFloat(e.target.value))}
                                        />
                                    </Wrapper>
                                    <Wrapper width="100%" gap="10px">
                                        <InputRange
                                            label="Performance"
                                            id="performance"
                                            value={performance}
                                            onChange={(e) => handleSliderChange('performance', parseFloat(e.target.value))}
                                        />
                                    </Wrapper>
                                    <Wrapper width="100%" gap="10px">
                                        <InputRange
                                            label="Flexibilité"
                                            id="flexibility"
                                            value={flexibility}
                                            onChange={(e) => handleSliderChange('flexibility', parseFloat(e.target.value))}
                                        />
                                    </Wrapper>
                                </Wrapper>
                                <Wrapper width="30%" gap="20px" alignItems="center" justifyContent="center">
                                    <H3 color="#DF6951">Note globale</H3>
                                    <Wrapper width="100%" gap="10px">
                                        <InputRange
                                            label="Note"
                                            id="note"
                                            value={note}
                                            onChange={(e) => handleSliderChange('note', parseFloat(e.target.value))}
                                        />
                                    </Wrapper>
                                </Wrapper>
                            </WrapperRow>
                        </Wrapper>

                        <Flex gap="3" mt="4" justify="end">
                            <Dialog.Close>
                                <Button variant="soft" color="gray" type="button">
                                    Annuler
                                </Button>
                            </Dialog.Close>
                            <ModalBtn type="submit" disabled={submitLoading}>
                                {submitLoading ? "Envoi..." : "Valider"}
                            </ModalBtn>
                        </Flex>
                    </form>
                ) : (
                    <Flex direction="column" gap="4" align="center" py="6">
                        <p>Vous devez être connecté pour donner un avis</p>
                        <Btn onClick={() => router.push('/connexion')}>Se connecter</Btn>
                    </Flex>
                )}
            </Dialog.Content>
        </Dialog.Root>
    );
};

export default Modal;