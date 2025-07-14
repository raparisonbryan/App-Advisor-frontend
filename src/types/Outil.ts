export interface Outil {
    _id: string;
    imageURL: string;
    name: string;
    description: string;
    moyenneNote: number;
    nombreAvis: number;
    moyenneDifficulte: number;
    moyennePerformance: number;
    moyenneFlexibilite: number;
    categories?: {
        _id: string;
        name: string;
    }[];
}