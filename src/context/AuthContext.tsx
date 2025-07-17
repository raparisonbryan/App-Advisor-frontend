'use client';

import { createContext, useContext, ReactNode } from 'react';
import React from 'react';
import {
    useQuery,
    useMutation,
    useQueryClient
} from '@tanstack/react-query';
import {
    fetchCurrentUser,
    loginUser,
    logoutUser,
    isAuthenticated as checkAuth,
    LoginCredentials
} from '@/services/AuthService';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
    user: { id: string } | null;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    login: (credentials: LoginCredentials) => Promise<{ userId: string }>;
    logout: () => Promise<{ success: boolean }>;
    isAuthenticated: () => boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé à l\'intérieur du AuthProvider');
    }
    return context;
};

export function AuthProvider({ children }: AuthProviderProps) {
    const queryClient = useQueryClient();
    const router = useRouter();

    React.useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decoded: { exp: number } = jwtDecode(token);
                if (!decoded.exp || Date.now() >= decoded.exp * 1000) {
                    Cookies.remove('token');
                    router.push('/connexion');
                }
            } catch {
                Cookies.remove('token');
                router.push('/connexion');
            }
        }
    }, [router]);

    const {
        data: user,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ['currentUser'],
        queryFn: fetchCurrentUser,
        retry: false,
        staleTime: 1000 * 60 * 5,
    });

    const loginMutation = useMutation({
        mutationFn: loginUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        }
    });

    const logoutMutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        }
    });

    const login = async (credentials: LoginCredentials) => {
        return loginMutation.mutateAsync(credentials);
    };

    const logout = async () => {
        return logoutMutation.mutateAsync();
    };

    const isAuthenticated = () => {
        return checkAuth();
    };

    const authContextValue: AuthContextType = {
        user: user || null,
        isLoading,
        isError,
        error: error as Error | null,
        login,
        logout,
        isAuthenticated
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}