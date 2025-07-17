import Cookies from 'js-cookie';

export async function fetchCategories() {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/categories');

    if (!response.ok) {
        throw new Error('Problème lors de la récupération des catégories');
    }

    return await response.json();
}

export async function createCategory(data: { name: string; imageURL: string; description: string }) {
    const token = Cookies.get('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de l'ajout de la catégorie");
    }
    return await response.json();
}

export async function deleteCategory(catId: string) {
    const token = Cookies.get('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${catId}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : undefined,
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de la suppression de la catégorie");
    }
    return await response.json();
}

export async function addOutilToCategory(catId: string, outilId: string) {
    const token = Cookies.get('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${catId}/outils`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ outils: [outilId] }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de l'ajout de l'outil à la catégorie");
    }
    return await response.json();
}

export async function removeOutilFromCategory(catId: string, outilsIds: string[]) {
    const token = Cookies.get('token');
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories/${catId}/outils`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ outils: outilsIds }),
    });
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || "Erreur lors de la suppression de l'outil de la catégorie");
    }
    return await response.json();
}