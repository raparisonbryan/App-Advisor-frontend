'use client'

import {createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction} from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

interface AuthContextType {
    user: { id: string } | null;
    setUser: Dispatch<SetStateAction<{ id: string } | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<{ id: string } | null>(null);

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decoded: { userId: string } = jwtDecode(token);
                setUser({ id: decoded.userId });
            } catch (error) {
                console.error("Erreur de décodage du token :", error);
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};