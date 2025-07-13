import React, { useState, useEffect } from 'react';
import styles from "./Modal.module.scss";
import Wrapper from "@/components/Atoms/Wrapper/Wrapper";
import TextArea from "@/components/Atoms/Input/TextArea";
import WrapperRow from "@/components/Atoms/Wrapper/WrapperRow";
import InputRange from "@/components/Atoms/Input/InputRange";
import H3 from "@/components/Atoms/Title/H3/H3";
import InputButton from "@/components/Atoms/Input/InputButton";
import Cookies from 'js-cookie';
import Btn from "@/components/Atoms/Button/Btn";
import {useRouter} from "next/navigation";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    outilId: string;
}

const Modal = ({ isOpen, onClose, outilId }: ModalProps) => {
    const [message, setMessage] = useState('');
    const [difficulty, setDifficulty] = useState(2.5);
    const [performance, setPerformance] = useState(2.5);
    const [flexibility, setFlexibility] = useState(2.5);
    const [note, setNote] = useState(2.5);
    const token = Cookies.get('token');
    const router = useRouter();

    const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).className === styles.modal_overlay) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

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

        if (!token) {
            console.error("L'utilisateur n'est pas authentifié.");
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
            }

            console.log("Avis soumis avec succès!");
            setMessage('');
            setDifficulty(2.5);
            setPerformance(2.5);
            setFlexibility(2.5);
            setNote(2.5);
            onClose();

            window.location.reload();
        } catch (error) {
            console.error("Erreur lors de la soumission de l'avis:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal_overlay} onClick={handleOutsideClick}>
            <div className={styles.modal_container}>
                <div className={styles.modal_header}>
                    <H3 color="#DF6951">Donner un avis</H3>
                    <button className={styles.close_button} onClick={onClose}>×</button>
                </div>
                <div className={styles.modal_content}>
                    {token ? (
                        <form className={styles.form} onSubmit={handleSubmit}>
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
                                        <InputButton text="Valider" />
                                    </Wrapper>
                                </WrapperRow>
                            </Wrapper>
                        </form>
                    ) : (
                        <div className={styles.login_prompt}>
                            <p className={styles.text}>Vous devez être connecté pour donner un avis</p>
                            <Btn onClick={() => router.push('/connexion')}>Se connecter</Btn>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;