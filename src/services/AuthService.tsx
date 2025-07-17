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
        console.error("Erreur de décodage du token:", error);
        throw new Error("Session invalide");
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
        const errorData = await response.json();
        throw new Error(errorData.msg || "Une erreur est survenue lors de l'inscription");
    }

    return await response.json();
}

export async function logoutUser() {
    Cookies.remove('token');
    return { success: true };
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
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de la réinitialisation du mot de passe");
    }
    return await response.json();
}

export async function getUserById(id: string) {
    const token = Cookies.get('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de la récupération du profil utilisateur");
    }
    return await response.json();
}

export async function updateUserById({ id, user }: { id: string, user: Partial<{ name: string; email: string; Admin?: boolean }> }) {
    const token = Cookies.get('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
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
    const token = Cookies.get('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de la récupération des utilisateurs");
    }
    return await response.json();
}

export async function updateUser({ id, user }: { id: string, user: Partial<{ name: string; email: string; Admin?: boolean }> }) {
    const token = Cookies.get('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
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
    const token = Cookies.get('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${id}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de la suppression de l'utilisateur");
    }
    return await response.json();
}

export function isAuthenticated(): boolean {
    const token = Cookies.get('token');
    return !!token;
}