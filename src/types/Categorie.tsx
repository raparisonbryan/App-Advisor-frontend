import {Outil} from "@/types/Outil";

export interface Categorie {
    _id: string;
    imageURL: string;
    name: string;
    description: string;
    outils: Outil[];
}