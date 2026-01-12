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
    products = input.required<Product[]>();
}
