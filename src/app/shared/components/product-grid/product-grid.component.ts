import { Component, input } from '@angular/core';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

@Component({
    selector: 'app-product-grid',
    standalone: true,
    imports: [],
    templateUrl: './product-grid.component.html',
    styleUrl: './product-grid.component.scss'
})
export class ProductGridComponent {
    // Dumb Component - Mise en page grille responsive
    // CSS Grid : repeat(auto-fill, minmax(300px, 1fr))
    products = input.required<Product[]>();
}
