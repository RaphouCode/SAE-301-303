import { Component, input, output } from '@angular/core';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    pieces?: number;
}

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
    product = input.required<Product>();
    addToCart = output<Product>();

    onReserve(): void {
        this.addToCart.emit(this.product());
    }
}
