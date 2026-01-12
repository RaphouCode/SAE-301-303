import { Component, input } from '@angular/core';

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

@Component({
    selector: 'app-related-products',
    standalone: true,
    imports: [],
    templateUrl: './related-products.component.html',
    styleUrl: './related-products.component.scss'
})
export class RelatedProductsComponent {
    products = input.required<Product[]>();
}
