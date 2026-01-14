import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { OrderService } from '../../../core/services/order.service';
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
    authService = inject(AuthService);
    private orderService = inject(OrderService);
    private router = inject(Router);

    isProcessing = signal(false);
    orderSuccess = signal(false);
    orderError = signal<string | null>(null);
    orderId = signal<number | null>(null);

    close() {
        this.cartService.closeCart();
        // Reset states when closing
        this.orderSuccess.set(false);
        this.orderError.set(null);
    }

    onRemove(id: number) {
        this.cartService.removeFromCart(id);
    }

    onUpdateQuantity(event: { id: number; quantity: number }) {
        this.cartService.updateQuantity(event.id, event.quantity);
    }

    checkout() {
        // Check if user is logged in
        if (!this.authService.isLoggedIn) {
            this.cartService.closeCart();
            this.router.navigate(['/login']);
            return;
        }

        const user = this.authService.currentUser;
        if (!user) return;

        // Check total quantity
        const totalQuantity = this.cartService.items().reduce((acc, item) => acc + item.quantity, 0);
        if (totalQuantity > 10) {
            this.orderError.set('La quantité totale ne peut pas dépasser 10 boxes.');
            return;
        }

        // Prepare order data
        const orderData = {
            id_client: user.id_client,
            box: this.cartService.items().map(item => ({
                id_box: item.box.id_box,
                quantite: item.quantity
            })),
            adresse: user.adresse,
            canal: 'web'
        };

        this.isProcessing.set(true);
        this.orderError.set(null);

        this.orderService.createOrder(orderData).subscribe({
            next: (response) => {
                this.isProcessing.set(false);
                if (response.success) {
                    this.orderSuccess.set(true);
                    this.orderId.set(response.order_id);
                    this.cartService.clearCart();
                } else {
                    this.orderError.set(response.error || 'Erreur lors de la commande');
                }
            },
            error: (err) => {
                this.isProcessing.set(false);
                this.orderError.set(err.error?.error || 'Erreur de connexion au serveur');
            }
        });
    }
}
