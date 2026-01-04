import { Component } from '@angular/core';

@Component({
    selector: 'app-hero-banner',
    standalone: true,
    imports: [],
    templateUrl: './hero-banner.component.html',
    styleUrl: './hero-banner.component.scss'
})
export class HeroBannerComponent {
    // Dumb Component - Section héro de l'accueil
    // Affiche l'image principale et le message "SUSHI"
    // Utiliser NgOptimizedImage avec priority pour LCP optimisé
}
