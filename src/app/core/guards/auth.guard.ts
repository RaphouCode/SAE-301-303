import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    return true; // Passe-partout pour l'instant
};
