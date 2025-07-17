import Cookies from 'js-cookie';
import { Avis } from '@/types/Avis';

export async function fetchRandomAvis(): Promise<Avis[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/avis');
    if (!response.ok) {
        throw new Error('Problème lors de la récupération des avis');
    }
    return await response.json();
}

export async function fetchAvis(): Promise<Avis[]> {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/avis');
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des avis');
    }
    return await response.json();
}

export async function fetchAvisByOutil(outilId: string): Promise<Avis[]> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/avis/outil/${outilId}`);
    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des avis de l\'outil');
    }
    return await response.json();
}

export async function createAvis(data: {
    outilId: string;
    message: string;
    difficulte: number;
    performance: number;
    flexibilite: number;
    note: number;
}): Promise<Avis> {
    const token = Cookies.get('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/avis/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Erreur lors de la création de l\'avis');
    }
    return await response.json();
}

export async function deleteAvis(avisId: string): Promise<void> {
    const token = Cookies.get('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/avis/${avisId}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Erreur lors de la suppression de l\'avis');
    }
}