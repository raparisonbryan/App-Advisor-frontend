import { Outil } from '@/types/Outil';
import Cookies from 'js-cookie';

export async function getOutils(): Promise<Outil[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/outils`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des outils');
    }
    return await response.json();
}

export async function getOutilById(id: string): Promise<Outil> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/outils/${id}`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération de l\'outil');
    }
    return await response.json();
}

export async function createOutil(data: { name: string; description: string; imageURL: string }) {
    const token = Cookies.get('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/outils`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de la création de l'outil");
    }
    return await response.json();
}

export async function updateOutil(id: string, data: { name: string; description: string; imageURL: string }) {
    const token = Cookies.get('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/outils/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de la modification de l'outil");
    }
    return await response.json();
}

export async function deleteOutil(id: string) {
    const token = Cookies.get('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/outils/${id}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de la suppression de l'outil");
    }
    return await response.json();
} 