'use client';

import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

interface AuthResponse {
    token: string;
    userId: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupCredentials {
    name: string;
    email: string;
    password: string;
}

export async function fetchCurrentUser() {
    const token = Cookies.get('token');
    if (!token) return null;

    try {
        const decoded: { userId: string } = jwtDecode(token);
        return { id: decoded.userId };
    } catch (error) {
        throw new Error("Session invalide", { cause: error });
    }
}

export async function loginUser(credentials: LoginCredentials) {
    const { email, password } = credentials;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        if (response.status === 429) {
            throw new Error('Trop de tentatives de connexion. Veuillez patienter quelques minutes avant de réessayer.');
        }
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Une erreur est survenue lors de la connexion');
    }

    const data: AuthResponse = await response.json();
    Cookies.set('token', data.token, { expires: 7 });

    return { userId: data.userId };
}

export async function signupUser(credentials: SignupCredentials) {
    const { name, email, password } = credentials;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
        if (response.status === 429) {
            throw new Error('Trop de tentatives d\'inscription. Veuillez patienter quelques minutes avant de réessayer.');
        }
        const errorData = await response.json();
        throw new Error(errorData.msg || "Une erreur est survenue lors de l'inscription");
    }

    return await response.json();
}

export async function logoutUser() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`, {
        method: 'POST',
        credentials: 'include', 
    });
    Cookies.remove('token');
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Erreur lors de la déconnexion');
    }
    return await response.json();
}

export async function forgotPassword(email: string) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/forgot-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    if (!response.ok) {
        if (response.status === 429) {
            throw new Error('Trop de tentatives de réinitialisation. Veuillez patienter quelques minutes avant de réessayer.');
        }
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de l'envoi du mail de réinitialisation");
    }
    return await response.json();
}

export async function resetPassword({ token, password }: { token: string, password: string }) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/reset-password/${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
    });
    if (!response.ok) {
        if (response.status === 429) {
            throw new Error('Trop de tentatives de réinitialisation. Veuillez patienter quelques minutes avant de réessayer.');
        }
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de la réinitialisation du mot de passe");
    }
    return await response.json();
}

export async function getUserById(id: string) {
    const response = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de la récupération du profil utilisateur");
    }
    return await response.json();
}

export async function updateUserById({ id, user }: { id: string, user: Partial<{ name: string; email: string; Admin?: boolean }> }) {
    const response = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de la mise à jour du profil utilisateur");
    }
    return await response.json();
}

export async function updateCurrentUser(user: Partial<{ name: string; email: string; Admin?: boolean }>) {
    const response = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de la mise à jour du profil utilisateur");
    }
    return await response.json();
}

export async function getUsers() {
    const response = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/user`);
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de la récupération des utilisateurs");
    }
    return await response.json();
}

export async function updateUser({ id, user }: { id: string, user: Partial<{ name: string; email: string; Admin?: boolean }> }) {
    const response = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de la modification de l'utilisateur");
    }
    return await response.json();
}

export async function deleteUser(id: string) {
    const response = await authFetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de la suppression de l'utilisateur");
    }
    return await response.json();
}

export async function refreshAccessToken() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Impossible de rafraîchir le token');
    }

    const data = await response.json();
    if (data.token) {
        Cookies.set('token', data.token, { expires: 7 });
    }
    return data;
}

export function isAuthenticated(): boolean {
    const token = Cookies.get('token');
    return !!token;
}

async function authFetch(input: RequestInfo, init?: RequestInit) {
    let token = Cookies.get('token');
    let headers = {
        ...init?.headers,
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };

    let response = await fetch(input, { ...init, headers });

    if (response.status === 401) {
        try {
            await refreshAccessToken();
            token = Cookies.get('token');
            headers = {
                ...init?.headers,
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
            };
            response = await fetch(input, { ...init, headers });
        } catch {
            Cookies.remove('token');
            if (typeof window !== 'undefined') {
                window.location.href = '/connexion';
            }
            throw new Error('Session expirée, veuillez vous reconnecter.');
        }
    }

    return response;
}