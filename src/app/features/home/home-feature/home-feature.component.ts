import { Component } from '@angular/core';

@Component({
    selector: 'app-home-feature',
    standalone: true,
    imports: [],
    templateUrl: './home-feature.component.html',
    styleUrl: './home-feature.component.scss'
})
export class HomeFeatureComponent {
    // Smart Component - Orchestre les sections de la page d'accueil
    // Charge les données et les distribue aux composants Dumb enfants
    // Composants enfants : HeroBanner, CategoryShowcase, BestSellersGrid
}
