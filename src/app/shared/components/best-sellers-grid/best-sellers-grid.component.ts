import { Component, input } from '@angular/core';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    is_featured?: boolean;
}

@Component({
    selector: 'app-best-sellers-grid',
    standalone: true,
    imports: [],
    templateUrl: './best-sellers-grid.component.html',
    styleUrl: './best-sellers-grid.component.scss'
})
export class BestSellersGridComponent {
    // Dumb Component - Grille produits phares
    // Reçoit les produits filtrés avec is_featured: true
    products = input.required<Product[]>();
}
