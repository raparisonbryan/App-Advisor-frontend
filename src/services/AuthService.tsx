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

export async function logoutUser() {
    Cookies.remove('token');
    return { success: true };
}

export function isAuthenticated(): boolean {
    const token = Cookies.get('token');
    return !!token;
}