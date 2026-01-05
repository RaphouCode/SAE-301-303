import { Component, input, output } from '@angular/core';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cart-item-row',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cart-item-row.component.html',
    styleUrl: './cart-item-row.component.scss'
})
export class CartItemRowComponent {
    // Dumb Component - Ligne article panier
    // Image, Nom, Qté, Prix, Bouton Supprimer
    item = input.required<CartItem>();

    remove = output<number>();
    updateQuantity = output<{ id: number; quantity: number }>();
}
