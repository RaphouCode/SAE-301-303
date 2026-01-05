import { Injectable, computed, signal } from '@angular/core';
import { Box } from '../models/box.model';

export interface CartItem {
    box: Box;
    quantity: number;
}

@Injectable({
    providedIn: 'root'
})
export class CartService {
    // State
    private itemsSig = signal<CartItem[]>([]);
    private isOpenSig = signal<boolean>(false);

    // Computed
    readonly items = this.itemsSig.asReadonly();
    readonly isOpen = this.isOpenSig.asReadonly();

    readonly count = computed(() =>
        this.itemsSig().reduce((acc, item) => acc + item.quantity, 0)
    );

    readonly total = computed(() =>
        this.itemsSig().reduce((acc, item) => acc + (item.box.prix * item.quantity), 0)
    );

    // Methods
    toggleCart() {
        this.isOpenSig.update(v => !v);
    }

    openCart() {
        this.isOpenSig.set(true);
    }

    closeCart() {
        this.isOpenSig.set(false);
    }

    addToCart(box: Box, quantity: number = 1) {
        this.itemsSig.update(items => {
            const existing = items.find(i => i.box.id_box === box.id_box);
            if (existing) {
                return items.map(i =>
                    i.box.id_box === box.id_box
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            }
            return [...items, { box, quantity }];
        });
        this.openCart(); // Ouvre le panier quand on ajoute
    }

    removeFromCart(boxId: number) {
        this.itemsSig.update(items => items.filter(i => i.box.id_box !== boxId));
    }

    updateQuantity(boxId: number, quantity: number) {
        if (quantity <= 0) {
            this.removeFromCart(boxId);
            return;
        }
        this.itemsSig.update(items =>
            items.map(i => i.box.id_box === boxId ? { ...i, quantity } : i)
        );
    }

    clearCart() {
        this.itemsSig.set([]);
    }
}
