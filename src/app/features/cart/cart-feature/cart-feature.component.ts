import { Component } from '@angular/core';

@Component({
    selector: 'app-cart-feature',
    standalone: true,
    imports: [],
    templateUrl: './cart-feature.component.html',
    styleUrl: './cart-feature.component.scss'
})
export class CartFeatureComponent {
    // Smart Component - Page Panier & Commande
    // Affiche le résumé du panier
    // Gère l'état du panier via CartService
    // Composants enfants : CartItemRow, OrderSummary
}
