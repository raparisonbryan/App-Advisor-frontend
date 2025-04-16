import { User } from './User';
import { Outil } from './Outil';

export interface Avis {
    _id: string;
    outils: Outil;
    message: string;
    note: number;
    user: User;
}