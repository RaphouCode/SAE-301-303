import { Component, input, output } from '@angular/core';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

@Component({
    selector: 'app-cart-item-row',
    standalone: true,
    imports: [],
    templateUrl: './cart-item-row.component.html',
    styleUrl: './cart-item-row.component.scss'
})
export class CartItemRowComponent {
    // Dumb Component - Ligne article panier
    // Image, Nom, Qté, Prix, Bouton Supprimer
    item = input.required<CartItem>();

    remove = output<string>();
    updateQuantity = output<{ id: string; quantity: number }>();
}
