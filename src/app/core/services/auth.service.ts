import { Injectable, signal, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export interface User {
    id_client: number;
    nom: string;
    prenom: string;
    email: string;
    adresse: string;
    status: string;
}

const STORAGE_KEY = 'sushimi_user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private platformId = inject(PLATFORM_ID);
    private userSig = signal<User | null>(this.loadFromStorage());

    readonly user = this.userSig.asReadonly();

    get isLoggedIn(): boolean {
        return this.userSig() !== null;
    }

    get currentUser(): User | null {
        return this.userSig();
    }

    login(user: User, token: string): void {
        this.userSig.set(user);
        if (isPlatformBrowser(this.platformId)) {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
            sessionStorage.setItem('sushimi_token', token);
        }
    }

    logout(): void {
        this.userSig.set(null);
        if (isPlatformBrowser(this.platformId)) {
            sessionStorage.removeItem(STORAGE_KEY);
            sessionStorage.removeItem('sushimi_token');
        }
    }

    private loadFromStorage(): User | null {
        if (isPlatformBrowser(this.platformId)) {
            try {
                const saved = sessionStorage.getItem(STORAGE_KEY);
                if (saved) {
                    return JSON.parse(saved);
                }
            } catch (e) {
                console.error('Error loading user from storage:', e);
            }
        }
        return null;
    }
}
