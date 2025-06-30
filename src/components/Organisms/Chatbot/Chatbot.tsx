'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from "./Chatbot.module.scss"
import ChatbotIcon from "@/components/Atoms/Icons/ChatbotIcon";
import {CloseOutlined, UserOutlined} from "@ant-design/icons";

interface Message {
    id: number;
    text: string;
    isUser: boolean;
    timestamp: Date;
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?",
            isUser: false,
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 100)}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [inputValue]);

    const handleSendMessage = async () => {
        if (inputValue.trim()) {
            const newMessage: Message = {
                id: messages.length + 1,
                text: inputValue,
                isUser: true,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, newMessage]);
            setInputValue('');
            setIsThinking(true);

            const chatUrl = process.env.NEXT_PUBLIC_CHAT_URL;
            if (!chatUrl) {
                throw new Error("L'URL du service de chat n'est pas configurée");
            }

            const response = await fetch(chatUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({message: inputValue})
            });

            const data = await response.json();

            if (response.ok) {
                const botResponse: Message = {
                    id: newMessage.id + 1,
                    text: data.response,
                    isUser: false,
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, botResponse]);
            } else {
                throw new Error(data.error ?? "Erreur lors de la récupération de la réponse.");
            }
            setIsThinking(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    return (
        <div className={styles.chatbot_container}>
            <button 
                className={styles.chatbot_button}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Ouvrir le chatbot"
            >
                <ChatbotIcon />
            </button>

            {isOpen && (
                <div className={styles.chatbot_popup}>
                    <div className={styles.chatbot_header}>
                        <div className={styles.chatbot_info}>
                            <div className={styles.avatar}>
                                <UserOutlined />
                            </div>
                            <div className={styles.chatbot_details}>
                                <p>Assistant Virtuel</p>
                                <span>En ligne</span>
                            </div>
                        </div>
                        <button 
                            className={styles.close}
                            onClick={() => setIsOpen(false)}
                            aria-label="Fermer le chatbot"
                        >
                            <CloseOutlined />
                        </button>
                    </div>

                    <div className={styles.messages_container}>
                        {messages.map((message) => (
                            <div 
                                key={message.id} 
                                className={`${styles.message} ${message.isUser ? styles.user_message : styles.bot_message}`}
                            >
                                <div className={styles.message_content}>
                                    <p>{message.text}</p>
                                    <span className={styles.timestamp}>
                                        {formatTime(message.timestamp)}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {isThinking && (
                            <div className={`${styles.message} ${styles.bot_message}`}>
                                <div className={`${styles.message_content} ${styles.thinking}`}>
                                    <div className={styles.thinking_dots}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className={styles.input_container}>
                        <textarea
                            ref={textareaRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Tapez votre message..."
                            className={styles.input}
                            rows={1}
                        />
                        <button 
                            onClick={handleSendMessage}
                            className={styles.button}
                            disabled={!inputValue.trim()}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Chatbot;