import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { CartItemRowComponent } from '../cart-item-row/cart-item-row.component';

@Component({
    selector: 'app-cart-overlay',
    standalone: true,
    imports: [CommonModule, CartItemRowComponent],
    templateUrl: './cart-overlay.component.html',
    styleUrl: './cart-overlay.component.scss'
})
export class CartOverlayComponent {
    cartService = inject(CartService);

    close() {
        this.cartService.closeCart();
    }

    onRemove(id: number) {
        this.cartService.removeFromCart(id);
    }

    onUpdateQuantity(event: { id: number; quantity: number }) {
        this.cartService.updateQuantity(event.id, event.quantity);
    }
}
