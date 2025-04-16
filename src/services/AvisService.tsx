export async function fetchRandomAvis() {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/avis');

    if (!response.ok) {
        throw new Error('Problème lors de la récupération des avis');
    }

    return await response.json();
}