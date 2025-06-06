export async function fetchCategories() {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/categories');

    if (!response.ok) {
        throw new Error('Problème lors de la récupération des catégories');
    }

    return await response.json();
}