import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

@Component({
    selector: 'app-cart-item-row',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cart-item-row.component.html',
    styleUrl: './cart-item-row.component.scss'
})
export class CartItemRowComponent {
    item = input.required<CartItem>();
    remove = output<number>();
    updateQuantity = output<{ id: number; quantity: number }>();
}
