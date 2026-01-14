import { Injectable, computed, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Box } from '../models/box.model';

export interface CartItem {
    box: Box;
    quantity: number;
}

const STORAGE_KEY = 'sushimi_cart';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private platformId = inject(PLATFORM_ID);
    private itemsSig = signal<CartItem[]>(this.loadFromStorage());
    private isOpenSig = signal<boolean>(false);

    readonly items = this.itemsSig.asReadonly();
    readonly isOpen = this.isOpenSig.asReadonly();

    readonly count = computed(() =>
        this.itemsSig().reduce((acc, item) => acc + item.quantity, 0)
    );

    readonly total = computed(() =>
        this.itemsSig().reduce((acc, item) => acc + (item.box.prix * item.quantity), 0)
    );

    constructor() {
        // Auto-save cart to localStorage whenever it changes
        effect(() => {
            this.saveToStorage(this.itemsSig());
        });
    }

    private loadFromStorage(): CartItem[] {
        if (isPlatformBrowser(this.platformId)) {
            try {
                const saved = localStorage.getItem(STORAGE_KEY);
                if (saved) {
                    return JSON.parse(saved);
                }
            } catch (e) {
                console.error('Error loading cart from localStorage:', e);
            }
        }
        return [];
    }

    private saveToStorage(items: CartItem[]): void {
        if (isPlatformBrowser(this.platformId)) {
            try {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
            } catch (e) {
                console.error('Error saving cart to localStorage:', e);
            }
        }
    }

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
        this.openCart();
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
