export interface Box {
    id_box: number;
    nom: string;
    pieces: number;
    prix: number;
    image: string;
    saveur: string;
    foods?: {
        name: string;
        quantity: number;
    }[];
    flavors?: string[];
}
