export interface Client {
    id_client?: number;
    nom: string;
    prenom: string;
    adresse: string;
    email: string;
    mot_de_passe?: string; // Optional because we might not always have it back from API
    api_token?: string;
}
